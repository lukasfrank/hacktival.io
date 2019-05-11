import os
import shutil
import urllib

BASE_CLASS_PATH = './classes'
BASE_DATASET_PATH = './dataset/'
MAX_IMAGES = 130

img_classes = os.listdir(BASE_CLASS_PATH)

shutil.rmtree('./dataset')
os.mkdir('./dataset')


for img_class in img_classes:
    class_name = img_class[:-4]

    os.mkdir('./dataset/'+class_name)

    links = open(BASE_CLASS_PATH + '/'+ img_class)
    for i, link in enumerate(links):
        try:
            urllib.urlretrieve(link, BASE_DATASET_PATH + '/' + class_name + '/' + str(i) + '.jpg')
        except:
            print("skip")
        print(link)
        print(i)

        if i >= MAX_IMAGES:
            break


