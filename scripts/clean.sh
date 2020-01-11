#!/bin/bash
echo $PWD
linkDir="/home/henry/Desktop"
exp="^(curriculum*.pdf)|(index.html)|(style.css)$"
# find is best way to sort tsedhrough files in dirs
cvDate=$(ls $PWD/out | grep -Eo curriculum[[:space:]][0-9]{2}-[0-9]{2}-[0-9]{2}[[:space:]][0-9]{2}:[0-9]{2})
echo "$cvDate"
zipName=$(sed -e 's/\s/_/g' <<< "$cvDate")
outFiles=$(find $PWD/out -maxdepth 1 -type f | grep -E $exp)
echo "$outFiles"
find $PWD/out -maxdepth 1 -type f | grep -E $exp
for file in $outFiles; do
  echo "$file"
  if [[ ! -d $file ]]; then
    if [[ ! -f $PWD/out/archived/$zipName.tar.gz ]]; then
      tar -cf $PWD/out/archived/$zipName.tar.gz $file
    else
      tar -uf $PWD/out/archived/$zipName.tar.gz $file
    fi
    rm $file
  fi
done
