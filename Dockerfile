FROM nginx:latest

# ------------------------------------------------------------------------------
# Provision the server
# ------------------------------------------------------------------------------
COPY ./build  /usr/share/nginx/html
CMD ["nginx", "-g" ,"daemon off;"]
