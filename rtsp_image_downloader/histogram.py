#!/usr/bin/env python
# coding: utf-8

# In[1]:


import glob
import cv2
import os
from shutil import copyfile


# In[2]:


mypath = "./data"
sim_threshold = 0.98


# In[3]:


files = glob.glob(mypath + "/*.jpg")
files.sort()


# In[4]:


print(files)


# In[5]:


def compare(filename1, filename2):
    img1 = cv2.imread(filename1)
    img2 = cv2.imread(filename2)
    histg1 = cv2.calcHist([img1],[0],None,[256],[0,256])
    histg2 = cv2.calcHist([img2],[0],None,[256],[0,256])
    a = cv2.compareHist(histg1,histg2,cv2.HISTCMP_CORREL)
    print(filename1, filename2, a)
    return a


# In[6]:


def upload(filename):
    target = filename.replace("data", "backup")
    copyfile(filename, target)


# In[9]:


if (len(files) >= 2):
    similarity = compare(files[0], files[1])
    if (similarity < sim_threshold):
        upload(files[1])
    os.remove(files[0])
    print("Done")
else:
    print("Not enough files")


# In[ ]:





# In[ ]:




