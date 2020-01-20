# 基础镜像
FROM bitnami/nginx:1.16-ol-7

# 维护人
MAINTAINER chenweilong<1433471850@qq.com>

# 将本地文件夹挂载到当前容器
#VOLUME /tmp

# 拷贝文件到容器
ADD dist/ /app

ADD default1.conf /opt/bitnami/nginx/conf/server_blocks/default.conf

#RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai  /etc/localtime
# 开放端口
EXPOSE 8080

CMD sed -i.bak "s/HTTP_BASE_API_1/$HTTP_BASE_API/g" /opt/bitnami/nginx/conf/server_blocks/default.conf && /run.sh
