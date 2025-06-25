---
date: '{{ .Date }}'
draft: true
title: '{{ replace .File.ContentBaseName "-" " " | title }}'
lang: "en"           # Add this line (change to "fa" in Persian archetype)
translationKey: '{{ .File.BaseFileName }}'  # Use base filename as translation key
images:
  - thumbnail.webp
cover:
  image: "thumbnail.webp"
  alt: "An example cover image"
  caption: "This is a caption under the image"
categories: []  # in " " separated by comma
tags: []        # in " " separated by comma
---