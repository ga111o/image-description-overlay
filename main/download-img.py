from selenium.webdriver.firefox.service import Service
from selenium.webdriver.common.by import By
import os
import sys
import json
import DEBUG
import sqlite3
import hashlib
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.common.exceptions import NoSuchElementException
import time
from urllib.parse import urljoin, urlparse

DRIVER_PATH = "./gecko/geckodriver"

if len(sys.argv) > 4:
    session = sys.argv[1]
    url = sys.argv[2]
    language = sys.argv[3]
    title = sys.argv[4]

    if DEBUG.PRINT_LOG_BOOLEN:
        print(f" | {session} |-- in the download-img.py")

        print(f" | {session} |---- sys.argv[1]", sys.argv[1])
        print(f" | {session} |---- sys.argv[2]", sys.argv[2])
        print(f" | {session} |---- sys.argv[3]", sys.argv[3])
        print(f" | {session} |---- sys.argv[4]", sys.argv[4])

img_folder = os.path.join(os.path.dirname(__file__), "source", session, "imgs")
response_folder = f"./source/{session}/responses"
db_folder = "./database"

if not os.path.exists(img_folder):
    os.makedirs(img_folder)
if not os.path.exists(response_folder):
    os.makedirs(response_folder)
if not os.path.exists(db_folder):
    os.makedirs(db_folder)

options = webdriver.FirefoxOptions()
options.add_argument("--disable-dev-shm-usage")
options.add_argument(
    "user-agent={Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36}")
options.add_argument('--headless')
options.set_preference("browser.download.dir", img_folder)
options.set_preference("browser.download.folderList", 2)
options.set_preference("browser.helperApps.neverAsk.saveToDisk",
                       "image/jpeg,image/webp,image/png,image/gif")

service = Service(executable_path=DRIVER_PATH)
driver = webdriver.Firefox(service=service, options=options)

db_path = os.path.join(db_folder, "images.db")

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    image_name TEXT,
    original_url TEXT,
    img_path TEXT,
    context TEXT,
    language TEXT,
    title TEXT,
    hash TEXT,
    caption_output TEXT,
    llm_output TEXT,
    lmm_output TEXT,
    object_output TEXT,
    original_alt TEXT
)
""")
conn.commit()


def extract_context(img_element):
    # 이미지 태그의 부모 요소 찾기
    parent_element = img_element.find_element(By.XPATH, '..')
    context = []
    current_element = parent_element

    # 상위 부모 요소로 이동하며 텍스트 추출
    while current_element is not None:
        # 현재 요소의 텍스트 추출
        text = current_element.text.strip()

        if text:
            context.append(text)

        # 자식 요소 중 텍스트가 포함된 요소가 있는지 확인
        children = current_element.find_elements(By.XPATH, './*')
        if any(child.text.strip() for child in children):
            break

        # 상위 부모 요소로 이동
        try:
            current_element = current_element.find_element(By.XPATH, '..')
        except NoSuchElementException:
            break

    # context를 문자열로 결합
    context_str = ' '.join(context)

    # 5000자 이상이면 잘라내기
    if len(context_str) > 5000:
        context_str = context_str[:5000] + "..."

    return context_str


def get_image_hash(image_path):
    hasher = hashlib.sha256()
    with open(image_path, 'rb') as img_file:
        buf = img_file.read()
        hasher.update(buf)
    return hasher.hexdigest()


response_data = {}

try:
    # Handle local files
    if url.startswith('file://'):
        url_path = url[7:]  # Remove 'file://' prefix
        if os.path.exists(url_path):
            driver.get(url)
        else:
            raise FileNotFoundError(f"Local file not found: {url_path}")
    else:
        driver.get(url)

    images = driver.find_elements(By.TAG_NAME, 'img')

    for img_element in images:
        try:
            src = img_element.get_attribute("src")
            if not src:
                continue

            # Handle relative paths for local files
            if url.startswith('file://'):
                if src.startswith('file://'):
                    src_path = src[7:]
                else:
                    base_path = os.path.dirname(url[7:])
                    src_path = os.path.join(base_path, src)
                    src = 'file://' + os.path.abspath(src_path)

            # Remove URL parameters after file extension
            src = src.split('?')[0]
            alt_text = img_element.get_attribute('alt')
            img_extension = os.path.splitext(os.path.basename(src))[1]
            image_full_path = os.path.join(img_folder, os.path.basename(src))
            image_original_name = f"{os.path.splitext(os.path.basename(src))[0]}{
                img_extension}"

            driver.execute_script(f"var xhr = new XMLHttpRequest(); xhr.open('GET', '{src}', true); xhr.responseType = 'blob'; xhr.onload = function(e) {{ if (this.status == 200) {{ var blob = this.response; var img = document.createElement('img'); img.src = window.URL.createObjectURL(blob); document.body.appendChild(img); var a = document.createElement('a'); a.href = img.src; a.download = '{
                                  image_original_name}'; document.body.appendChild(a); a.click(); }} }}; xhr.send();")
            relative_path = os.path.relpath(
                image_full_path, "/Users/ga111o/Documents/dev/kwu-hci-context-based-image-caption/main")

            image_file = os.path.abspath(os.path.join(".", relative_path))
            time.sleep(0.3)

            img_hash = get_image_hash(image_full_path)

            parent_element = img_element.find_element(By.XPATH, '..')
            context = extract_context(img_element)
            response_data[image_original_name] = {
                "image_path": image_file,
                "context": context,
                "language": language,
                "title": title,
                "original_url": src,
                "hash": img_hash,
                "original_alt": alt_text
            }

            cursor.execute(
                "SELECT COUNT(*) FROM images WHERE hash = ?", (img_hash,))
            exists = cursor.fetchone()[0]
            if exists == 0:
                cursor.execute("""
                    INSERT INTO images (image_name, original_url, img_path, context, language, title, hash, original_alt)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                """, (image_original_name, src, image_file, context, language, title, img_hash, alt_text))
                conn.commit()

                if DEBUG.PRINT_LOG_BOOLEN:
                    print(f" | {session} |---- download {image_original_name}")
                    print(
                        f" | {session} |------ relative_path: {relative_path}")
                    print(f" | {session} |------ img_hash: {img_hash}")
                    print(
                        f" | {session} |------ inserted database {image_original_name}")
            else:
                if DEBUG.PRINT_LOG_BOOLEN:
                    print(
                        f" | {session} |---- already exists {image_original_name}")

        except Exception as e:
            if DEBUG.PRINT_LOG_BOOLEN:
                print(f" | {session} | ---- skipping {e}")

except Exception as e:
    if DEBUG.PRINT_LOG_BOOLEN:
        print(f" | {session} | ---- error {url}, {e}")

finally:
    driver.quit()

with open(os.path.join(response_folder, "input.json"), "w", encoding="utf-8") as json_file:
    json.dump(response_data, json_file, indent=4, ensure_ascii=False)

conn.close()
