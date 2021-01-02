if [ -z $1 ];then
parame="update"
else
parame=$1
fi

echo "# 提交代码"
git add .
git commit -m "${parame}"

echo "# 上传至Github:"
git push github master:master
echo "# 上传至码云"
git push gitee master:master
