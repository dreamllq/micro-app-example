FROM  swr.cn-north-4.myhuaweicloud.com/asdl-aps/nginx:1.25.1

RUN rm /etc/nginx/conf.d/*.conf

RUN mkdir -p /opt/dsp_web
WORKDIR /opt/dsp_web

ADD ./dist/ /opt/dsp_web/

ADD web.conf /etc/nginx/conf.d/web.conf
ADD nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

#CMD nginx -g "nginx start;"
#CMD ["service nginx start"]

RUN ["/bin/bash"]