# HCI

## related works

### 캡션에 관한 연구

> Uppara N. (2021) Effect of Image Captioning with Description on the Working Memory

Uppara N. (2021)은 이미지의 설명의 유무가 Working Memory에 끼치는 영향을 확인한 연구입니다. 이때, Working Memory는 단기간 동안 소량의 정보를 즉시 접근 가능한 형태로 유지하는 기억을 뜻합니다.

해당 연구는 이미지에 대한 설명이 제공될 때 이미지 캡션의 회상과 유지 기간을 관찰하도록 하였습니다.

실험은 3 단계로 구성하였으며, 각 단계 사이에 3에서 5일 간격을 두었습니다.

![positive and negative descriptions of image](<Screenshot 2024-12-11 at 12.11.56.png>)

참가자들은 각 단계에서 8개의 이미지에 대해 캡션을 작성하고, 이미지에 대한 긍정 혹은 부정적인 설명을 읽은 후 다시 캡션을 작성했습니다.

설명 없이 작성한 첫 번째 캡션과 비교했을 때, 50%의 참가자들이 설명을 읽은 후 작성한 두 번째 캡션을 다음 라운드에서 기억했습니다.

또한, 65%의 참가자들이 긍정적인 설명일 때의 캡션을 부정적인 설명일 때의 캡션보다 더 잘 기억했습니다.

즉, 이미지와 이미지에 대한 설명이 함께 제시 될 때가 이미지만 제시될 때보다 기억력 부분에서 긍정적인 영향을 끼친 것을 알 수 있습니다.

기억력은 모든 인지 기능에 기반이 되기에 이미지와 설명을 함께 제시하는 것을 통한 기억력 향상이 인지능력 향상까지 이어질 수 있음을 예상해볼 수 있습니다.

[Working Memory](https://pubmed.ncbi.nlm.nih.gov/1736359/)

[memory - cognitive](https://www.happyneuronpro.com/en/info/what-is-the-relationship-between-cognitive-functions-and-mental-performance/)

### 맥락을 포함한 텍스트 생성에 관한 연구

> Srivatsan, N. (2024). Alt-Text with Context: Improving Accessibility for Images on Twitter. _Computer Vision and Pattern Recognition._ 10.48550/arXiv.2305.14779

Srivatsan N. (2024)는 SNS에서 생성 모델을 사용하여 대체텍스트를 생성하는 연구입니다.te

![how to create context based alt-text](<Screenshot 2024-12-11 at 11.14.16.png>)

CLIP 모델을 통해 이미지를 인코딩 하여 feature embedding을 얻고, 이를 word embedding으로 투영합니다.

이후 해당 트윗의 임베딩과 결합하는 방식으로 맥락을 고려한 대체텍스트를 생성하였습니다.

![context based alt-text result](<Screenshot 2024-12-11 at 11.23.35.png>)

좌측은 ClipCap과 해당 연구에서 구현한 모델의 fluency와 descriptiveness를 비교한 결과이며, 우측은 파인 튜닝된 ClipCap 모델과 같은 비교를 한 결과.

양측 모두 ClipCap모델에 비해 두 항목 모두 향상을 이루었으며, 이를 통해 해당 연구진들은 이미지와 텍스트를 모두 고려하여 대체 텍스트를 생성하는 방식이 대체 텍스트가 없는 이미지에 자동으로 설명 생성하는 것부터 부적절한 대체 텍스트 식별할 수 있을 것이라 주장하였습니다.

이를 통해 인공지능 모델을 통하여 이미지에 대한 설명을 생성할 때에도 이미지 그 자체만을 사용하는 것보다 이미지 주변의 텍스트들, 즉, 맥락 정보를 고려하여 이미지에 대한 설명을 생성하는 것이 더 적절함을 알 수 있습니다.

---

Bernkastel(2024)에서 사용한, 웹 페이지에서 이미지 주변의 맥락 요소를 찾는 방식을 바탕으로, 해당 웹페이지의 제목과, 이미지의 부모 요소 내의 텍스트를 맥락으로 사용하였다.

---

관련 연구

Image detection: You Only Look Once: Unified, Real-Time Object Detection

- Redmon, J. (2016). Image detection: You Only Look Once: Unified, Real-Time Object Detection. Computer Vision and Pattern Recognition, 5, 779-788. 10.48550/arXiv.1506.02640

Show and Tell: A Neural Image Caption Generator

- Karpathy, A. (2015). Show and Tell: A Neural Image Caption Generator. Computer Vision and Pattern Recognition, 1, 3156-3164. 10.48550/arXiv.1411.4555

Multimodal Deep Learning

- Ngiam, J. (2011). Multimodal deep learning. International Conference on Machine Learning, 689-696. 10.5555/3104482.3104569
