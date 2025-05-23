1. Create new user
```bash
adduser username
```
2. Give the user sudo privileges:
```bash
usermod -aG sudo username
```
3. Switch to that user:
```bash
# Switch to another user (with their environment) 
su - username 

# Switch to another user (keeping current environment) 
su username

# Switch to root with environment 
sudo -i
```

>[!tip]
>```bash
># See who is logged in 
>who 
># See who is logged in with more details 
>w
>```







