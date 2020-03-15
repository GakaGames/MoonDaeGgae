#!/usr/bin/env python

import json
import os

from PyTexturePacker import Packer
from xml.etree import ElementTree


def tree_to_dict(tree):
    d = {}
    for index, item in enumerate(tree):
        if item.tag == 'key':
            if tree[index + 1].tag == 'string':
                d[item.text] = tree[index + 1].text
            elif tree[index + 1].tag == 'true':
                d[item.text] = True
            elif tree[index + 1].tag == 'false':
                d[item.text] = False
            elif tree[index + 1].tag == 'integer':
                d[item.text] = int(tree[index + 1].text);
            elif tree[index + 1].tag == 'dict':
                d[item.text] = tree_to_dict(tree[index + 1])
    return d


def plist2json(fname, ofname):
    root = ElementTree.fromstring(open(fname, 'r').read())
    d = tree_to_dict(root[0])

    result = {}
    result["meta"] = d["metadata"]
    result["meta"]["app"] = "texturepacker"
    result["frames"] = []

    for pic_name, info in d["frames"].items():
        new_info = {}

        coord = info["frame"].replace("{", "").replace("}", "")
        coord = coord.split(",")
        x = int(coord[0])
        y = int(coord[1])
        w = int(coord[2])
        h = int(coord[3])

        new_info["filename"] = pic_name.replace(".png", "")  # remove ext
        new_info["frame"] = {
            "x": x,
            "y": y,
            "w": w,
            "h": h,
        }
        new_info["rotated"] = False
        new_info["trimmed"] = False
        new_info["spriteSourceSize"] = {
            "x": 0,
            "y": 0,
            "w": w,
            "h": h,
        }
        new_info["sourceSize"] = {
            "w": w,
            "h": h,
        }
        result["frames"].append(new_info)

    with open(ofname, 'w') as f:
        json.dump(result, f, indent=2)


def main():
    # create a MaxRectsBinPacker
    packer = Packer.create(max_width=2048, max_height=2048, bg_color=0xffffff00, enable_rotated=False)
    # pack texture images under directory "test_case/" and name the output images as "test_case".
    # "%d" in output file name "test_case%d" is a placeholder, which is a multipack index, starting with 0.
    packer.pack("all/", "texture%d")

    plist2json("texture0.plist", "texture0.json")
    os.system("pngquant 256 < texture0.png > tmp.png")
    os.system("mv tmp.png texture0.png")


if __name__ == "__main__":
    main()
