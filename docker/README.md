#### 参考

- https://yq.aliyun.com/ask/50712

nginx.conf


    http {
    
    include       mime.types;
    default_type  application/octet-stream;
    
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    
    #access_log  logs/access.log  main;
    
    sendfile        on;
    #tcp_nopush     on;
    
    #keepalive_timeout  0;
    keepalive_timeout  65;
    
    client_header_buffer_size 16K;
    large_client_header_buffers 4 64K;
    client_body_buffer_size  512k;
    client_max_body_size 10m;
          
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header REMOTE-HOST $remote_addr;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    
    proxy_connect_timeout    300;
    proxy_read_timeout       300; 
    proxy_send_timeout       300;
    proxy_buffer_size        32k; 
    proxy_buffers            4 32k;
    proxy_busy_buffers_size 64k;
    proxy_temp_file_write_size 64k; 
    proxy_headers_hash_max_size 51200;
    proxy_headers_hash_bucket_size 6400;
    gzip  on;
    
    server {
        listen    80;
                server_name localhost test.jsh178.com;
        #       index index.html index.htm;
        #       rewrite ^(.*) https://$host$1 permanent;
                access_log   off;
                location / {
                  proxy_next_upstream http_502 http_504 error timeout invalid_header;
                  proxy_set_header X-Forwarded-For $http_x_forwarded_for;
                  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                  proxy_set_header X-Real-IP $remote_addr;
                  proxy_set_header Host $Host;
                  proxy_pass http://127.0.0.1:8080;
                  error_page 404 = /404.html;
                }
        }

HTTPS server

    server {
        listen 443;
        server_name test.jsh178.com; 
        ssl on;
        ssl_certificate 1_test.jsh178.com_bundle.crt;
        ssl_certificate_key 2_test.jsh178.com.key;
        ssl_session_timeout 5m;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2; 
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
        ssl_prefer_server_ciphers on;
        location / {
                 proxy_next_upstream http_502 http_504 error timeout invalid_header;
                 proxy_set_header X-Forwarded-For $http_x_forwarded_for;
                 proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                 proxy_set_header X-Real-IP $remote_addr;
                 proxy_set_header Host $Host;
                 proxy_pass http://127.0.0.1:8080;
                 error_page 404 = /404.html;
      }
    }