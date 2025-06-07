1. generate ssh key
```bash
ssh-keygen
```
- change the name of the key if you want like id_ad908409328_digitalocean
2. copy the public key and paste in the digital ocean (the key can be found where you created the private key with a .pub extension)
3. Create new user [[Creating new user]]
```bash
adduser username
```
4. Give the user sudo privileges:
```bash
usermod -aG sudo username
```
5. Switch to that user:
```bash
# Switch to another user (with their environment) 
su - username 
```
6. Install nvm from https://github.com/nvm-sh/nvm
7. nvm install 16
8. install git
```bash
sudo apt install git-all
```
7. clone your github repo (for private repos on AWS EC2, see [[Clone a Private Repo ( for EC2 or digitalOcean or any other VM)]])
8. install the dependencies by `npm i ` and copy your env variables. 
9. install a process manager to run the app. 
```shell 
npm i pm2@latest -g
```
10. start your app using [[pm2]] 
```shell 
pm2 start entry_file
#example pm2 start index.js

# pm2 start "npm run dev" --name myAppName
```
>[!tip]
>to start your app on reboot 
>```bash
> pm2 startup ubuntu 

11. Now your api is live on `droplet_id:port`. 

--- 
## Additional steps
1. setup ufw firewall 
```shell 
ufw enable 
ufw allow ssh && ufw allow http && ufw allow https
```
```shell 
#check the status of firewall 
ufw status
```
2. Install nginx reverse proxy to listen on default port
```shell
sudo apt install nginx
```
3. edit the `/etc/nginx/sites-available/default` file. Find the server_name and location lines and replace with these 
```nginx
server_name yourdomain.com www.yourdomain.com;

location / {
        # First attempt to serve request as file, then
        # as directory, then fall back to displaying a 404.
        proxy_pass http://localhost:8000; #or your app port
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
}
```
```nginx
# To run two sepearte backend on two different domain
server {
    listen 80;
    server_name abc.com;

    location / {
        proxy_pass http://localhost:3000;  # First backend on port 3000
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

server {
    listen 80;
    server_name xyz.com;

    location / {
        proxy_pass http://localhost:4000;  # Second backend on port 4000
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}

```

4. restart the nginx server 
```shell
$ sudo /etc/init.d/apache2 stop
Stopping apache2 (via systemctl): apache2.service.
$ sudo systemctl restart nginx
$ sudo service nginx restart
```
5. install a free ssl certificate form Let's Encrypt
```shell
# Install Certbot
sudo snap install --classic certbot

# Prepare the Certbot command
sudo ln -s /snap/bin/certbot /usr/bin/certbot

# Run this command to get a certificate
sudo certbot --nginx

# Test automatic renewal
sudo certbot renew --dry-run
```