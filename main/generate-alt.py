from tools import ImageCaptionTool
from PIL import Image
import os
import json
import tempfile
import sys
from langchain.agents import initialize_agent, AgentType
from langchain.callbacks import StreamingStdOutCallbackHandler
from tools import ImageCaptionTool, ObjectDetectionTool
import DEBUG
import hashlib
import sqlite3
from langchain.schema import SystemMessage
from langchain_community.chat_models import ChatOllama
from langchain_openai import ChatOpenAI

if len(sys.argv) > 1:
    session = sys.argv[1]

if DEBUG.PRINT_LOG_BOOLEN:
    print(f" | {session} |-- in the generate-alt.py")


with open(f'./source/{session}/responses/input.json', 'r', encoding='utf-8') as file:
    image_info = json.load(file)

image_files = list(image_info.keys())

key_path = f'./source/{session}/responses/key'
with open(key_path, 'r', encoding='utf-8') as file:
    api_key = file.read()

db_folder = "./database"

db_path = os.path.join(db_folder, "images.db")

conn = sqlite3.connect(db_path)
cursor = conn.cursor()


if DEBUG.SELECT_LLM == 1:
    llm = ChatOpenAI(
        model="gpt-4o-mini",
        temperature=0.1,
        streaming=True,
        api_key=api_key,
        callbacks=[StreamingStdOutCallbackHandler()],
    )
elif DEBUG.SELECT_LLM == 2:
    llm = ChatOllama(
        model="llama3:8b",
        temperature=0.1,
        streaming=True,
        callbacks=[StreamingStdOutCallbackHandler()],
    )

tools = [ImageCaptionTool(), ObjectDetectionTool()]

agent = initialize_agent(
    agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION,
    tools=tools,
    llm=llm,
    max_iterations=5,
    verbose=DEBUG.VERBOSE,
    early_stopping_method="generate",
    agent_kwargs={
        "system_message": SystemMessage(
            content="""
            You are a model for writing alt text so that blind people can understand images.

            You must describe the image briefly and effectively based on the content of the website.
        """
        )
    },
)


def get_image_hash(image_path):
    hasher = hashlib.sha256()
    with open(image_path, 'rb') as img_file:
        buf = img_file.read()
        hasher.update(buf)
    return hasher.hexdigest()


def check_image_in_db(conn, image_name, original_url, context, language, image_hash):
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id, llm_output FROM images WHERE image_name=? AND original_url=? AND context=? AND language=? AND hash=?
    """, (image_name, original_url, context, language, image_hash))
    return cursor.fetchone()


def update_image_output(conn, image_id, output):
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE images SET llm_output=? WHERE id=?
    """, (output, image_id))
    conn.commit()


def insert_image(conn, image_name, original_url, img_path, context, language, title, image_hash, output):
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO images (image_name, original_url, img_path, context, language, title, hash, llm_output)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, (image_name, original_url, img_path, context, language, title, image_hash, output))
    conn.commit()


def invoke_agent(language, title, context, image_path):
    translations = {
        "Korean": f"Image captioner가 생성한 설명을 이미지 주변의 텍스트 '{context}'와 이미지가 존재하는 웹페이지의 제목인 '{title}'과 연결지어 최종적으로 이미지에 대한 자연스러운 설명을 작성하세요. '{context}', '{title}'와 관련된 부분을 찾기 위해 Object detector를 사용해도 됩니다. 최종 설명은 원래 이미지의 설명처럼 자연스럽고 일관성이 있어야 하며, 당신의 최종 설명을 {language}로 번역하세요.",
        "Japanese": f"画像キャプション機能によって生成された説明文を、画像の周囲にあるテキスト '{context}' とつなげ、最終的に画像の自然な説明文を記述します。最終的な説明文は、元の画像の説明文と同じくらい自然で一貫性があり、ウェブページのタイトル'{title}'に基づいている必要があります。最終的な説明文を{language}に翻訳します。",
        "Chinese": f"将图像字幕生成器生成的描述与图像周围的文本'{context}'连接起来，最终写出图像的自然描述。最终的描述应与原始图片的描述一样自然、一致，并以网页标题'{title}'为基础。将最终描述翻译成{language}。",
        "Spanish": f"Conecte la descripción generada por el subtitulador de imágenes con el texto '{context}' alrededor de la imagen para escribir finalmente una descripción natural de la imagen. La descripción final debe ser tan natural y coherente como la descripción original de la imagen, y debe basarse en el título de la página web '{title}'. Traduzca la descripción final a {language}."
    }

    user_question = translations.get(language, f"Connect the description generated by the image captioner with the text '{
                                     context}' around the image to finally write a natural description of the image. The final description should be as natural and consistent as the original image's description, and should be based on the webpage's title '{title}'. Translate your final description into {language}.")

    if language == "English":
        if DEBUG.PRINT_LOG_BOOLEN:
            print(f" | {session} |---- {user_question}, image path: {image_path}")
        return agent.invoke(f"{user_question}, image path: {image_path}")
    else:
        if DEBUG.PRINT_LOG_BOOLEN:
            print(f" | {session} |---- {user_question}, image path: {image_path}")
        return agent.invoke(f"{user_question}, image path: {image_path}")


image_info_path = os.path.join("source", session, "responses", "input.json")

with open(image_info_path, "r", encoding="utf-8") as file:
    image_info = json.load(file)

for image_name, image_data in image_info.items():
    original_image_path = image_data["image_path"]

    if not os.path.exists(original_image_path):
        continue

    try:
        with Image.open(original_image_path) as img:
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGB")

            with tempfile.NamedTemporaryFile(delete=False, suffix=".jpg") as tmp:
                img.save(tmp.name)
                image_path = tmp.name

                try:
                    context = image_info[image_name]["context"]
                    language = image_info[image_name]["language"]
                    title = image_info[image_name]["title"]
                    original_url = image_data["original_url"]

                    image_hash = get_image_hash(image_path)

                    db_result = check_image_in_db(
                        conn, image_name, original_url, context, language, image_hash)

                    if db_result:
                        image_id, db_output = db_result
                        if db_output:
                            response = {"output": db_output}
                            if DEBUG.PRINT_LOG_BOOLEN:
                                print(
                                    f" | {session} |---- already exist llm alt text {image_name}")

                        else:
                            response = invoke_agent(
                                language, title, context, image_path)
                            update_image_output(
                                conn, image_id, response['output'])
                    else:
                        response = invoke_agent(
                            language, title, context, image_path)
                        insert_image(conn, image_name, original_url, image_path,
                                     context, language, title, image_hash, response['output'])

                except FileNotFoundError as e:
                    print(f" | {session} |---- can't open: {e}")
    except FileNotFoundError as e:
        print(f" | {session} |---- can't open: {e}")
        continue

    response_file_path = os.path.join(
        "source", session, "responses", "output.json")

    if os.path.exists(response_file_path):
        with open(response_file_path, "r", encoding="utf-8") as file:
            try:
                data = json.load(file)
            except json.JSONDecodeError:
                data = {}
    else:
        data = {}

    data[image_name] = {"image_name": image_name,
                        "response": response['output']}

    with open(response_file_path, "w", encoding="utf-8") as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

conn.close()