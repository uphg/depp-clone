# 第一次关联两个仓库
git init
git add .
git commit -m "first commit"
git remote add github git@github.com:uphg/depp-clone.git
git remote add gitee git@gitee.com:uphg/depp-clone.git

git push github master:master
git push gitee master:master
