---
lang: zh-CN
title: Git 命令行
---

- 基于 dev 分支的源切 feature 分支 `git checkout -b feature-1111 origin/dev`
- 修改提交信息 `git commit --amend -m "新的修改提交信息"`
- 合并某一次提交(某次提交的id) `git cherry-pick 8563870f51483795a47cebbe75563d35643190b7`
- 和远程仓库关联 `git remote add origin https://github.com/wenreq/vue-lazyload.git`
- 删除文件 `git rm 文件路径`
- 修改文件 `git mv 修改前.txt 修改后.txt`
- 恢复到某个版本 `git reset --hard 唯一id`
- 忽略某个add文件 `git reset HEAD 文件路径`
- 文件忽略文件 `.gitignore`
- 提交日志 `git log`
- 创建分支 `git branch dev`
- 切换分支 `git checkout dev`
- 将dev合并到master

  1.切换 master `git checkout master`

  2.`git pull`

  3.`git merge dev`

  4.`git push`

- 删除本地分支 `git branch -d 分支名`
- 删除本地的远程分支 `git branch -r -D origin/BranchName`
- 远程删除git服务器上的分支 `git push origin -d [BranchName]`
- 创建并切换 `git checkout -b dev`
- 文件目录 `ls`
- 打开编辑器 `code .`
- 强制提交 `git push origin master -f`

## git 配置

- 查看全局配置 `git config --list`
- 全局配置 `git config --global user.name "wenreq"`
- 全局配置 `git config --global user.email "wenreq@gmail.com"`

## git 常用命令

- clone 别人的项目仓库：`git clone [项目地址]`
- 本地新建文件件，执行 `git init`
- 添加某个文件到暂存区：`git add [文件名]`；把所有的文件都添加到暂存区：`git add .` （都是添加到暂存区）
- 提交暂存区到本地仓库：`git commit -m "提交信息"`
- 上传到远程仓库：`git push origin master`

- 查看提交的节点：`git log`
- 查看每次提交修改的文件：`git log --stat`
- 查看这次提交的修改内容：`git diff [commitID]`

### 代码回溯

- 回退到上一个版本 `git reset --hard HEAD^`
- 回退到上上一个版本 `git reset --hard HEAD^^`
- 回退到上上上一个版本 `git reset --hard HEAD^^^`
- 回退到指定版本（节点） `git reset --hard commitID` / `git checkout commitID`
- 强制提交 `git push origin master -f`
- 将暂存区中所有更改回退到工作区 `git checkout .`
- 将暂存区中某个更改的特定文件回退到工作区 `git checkout [文件名]`
- 回退暂存区中的更改,但保留工作区中的未跟踪文件 `git checkout --ours`
- 回退暂存区中的更改,包括未跟踪文件 `git checkout --theirs`
- 只想回退本地仓库中的特定文件或文件夹 `git reset --hard commitID -- filePath`


### 分支

- 查看远程分支：`git branch -r`
- 查看当前的项目分支：`git branch`
- 创建 develop 分支：`git checkout -b develop`
- 切换到 master 分支：`git checkout master`
- 将 develop 分支代码合并到 master 分支：`git merge develop`

### 查看远程地址

`git remote show origin`

### stash

> 在项目开发中，如果我们正在当前分支开发某个需求，突然遇到要切换分支去修改bug时，此时我们不想将当前的修改提交到远程分支，那么我们可以使用 git stash命令先存放起来。git stash 常用命令如下：

- `git stash save "message"`：存放时添加备注便于查找；当然只执行git stash 也可以，系统会自动为我们添加备注，但不便于查找。
- `git stash list`：查看存放列表。
- `git stash show`：显示改动信息，默认展示第一个储存，如果要显示其他存储，后面加 `stash@{index}`，比如第二个 `git stash show stash@{1}`
- `git stash show -p`：显示第一个存储的改动，如果想显示其他存储，`git stash show -p stash@{index}`，比如第二个：`git stash show -p stash@{1}`
- `git stash pop`：恢复之前存储的工作目录，将缓存堆栈中的对应stash删除，并将对应修改应用到当前的工作目录下,默认为第一个stash,即`stash@{0}`，如果要应用并删除其他stash，命令：`git stash pop stash@{$num}` ，比如应用并删除第二个：`git stash pop stash@{1}`
- `git stash apply`：应用某个存储,但其不会从存储列表中删除，默认使用第一个存储,即 `stash@{0}`，如果要使用其他个，`git stash apply stash@{index}` ， 比如第二个：`git stash apply stash@{1}`
- `git stash drop stash@{index}` : 丢弃 `stash@{index}` 存储，从列表中删除某个存储
- `git stash clear`: 清除存储列表中的所有stash
