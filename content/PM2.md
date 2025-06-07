---
title: PM2
---

PM2 is a production process manager for Node.js applications with a built-in load balancer. It allows you to keep applications alive forever, to reload them without downtime and to facilitate common system admin tasks.

## Installation

Install PM2 globally using npm:

```bash
npm install pm2 -g
```

## Basic Commands

### Starting an Application

To start an application:

```bash
pm2 start api.js
```

You can also start an application from an npm script:

```bash
# Example: pm2 start "npm run start"
```
To start an application with arguments
```bash
pm2 start api.js -- arg1 arg2
```


### Managing Processes

- **List all running processes:**
  ```bash
  pm2 list
  ```

- **Display detailed information about a specific process:**
  ```bash
  pm2 show <app_name>
  ```

- **Stop a specific process:**
  ```bash
  pm2 stop <app_name>
  ```

- **Restart a specific process:**
  ```bash
  pm2 restart <app_name>
  ```

- **Delete a process from PM2's list:**
  ```bash
  pm2 delete <app_name>
  ```

### Log Management

Display logs for a specific application:

```bash
pm2 logs <app_name>
```

### Startup Script

Generate a startup script to automatically restart PM2 and your processes on server reboot:

```bash
pm2 startup
```

After running `startup`, you need to save the current process list:

```bash
pm2 save
```
---

## Related Topics
- [[Deploy Nodejs on digital Ocean]]
