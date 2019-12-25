# 基础镜像
FROM nginx:latest

# 维护人
MAINTAINER chenweilong<1433471850@qq.com>

# 将本地文件夹挂载到当前容器
#VOLUME /tmp

# 拷贝文件到容器
ADD dist/ /usr/share/nginx/html/

ADD default1.conf /etc/nginx/conf.d/

RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
# 开放端口
EXPOSE 80
