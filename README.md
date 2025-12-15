# Biow Web

A modern web application built with React and Vite.

## Development

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Run Locally

Start the development server:

```bash
npm run dev
```

## Deployment

To deploy this application on a Linux server (e.g., Ubuntu) using Nginx, follow these steps.

### 1. Build the Application

Run the build command to generate the static files. This will create a `dist` folder in your project root.

```bash
npm run build
```

### 2. Prepare the Server

Ensure Nginx is installed on your server:

```bash
sudo apt update
sudo apt install nginx
```

### 3. Transfer Files

Transfer the contents of the `dist` folder to your server. You can use `scp` or an FTP client. For example, copying to `/var/www/biow-web`:

```bash
# Run this from your local machine
scp -r dist/* user@your-server-ip:/var/www/biow-web
```

*Note: Make sure the target directory exists and has the correct permissions.*

```bash
# On the server
sudo mkdir -p /var/www/biow-web
sudo chown -R $USER:$USER /var/www/biow-web
```

### 4. Configure Nginx

Create a new Nginx configuration file for your site:

```bash
sudo nano /etc/nginx/sites-available/biow-web
```

Add the following configuration. Replace `your-domain.com` with your actual domain or server IP.

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/biow-web;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Optional: Gzip compression for better performance
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

### 5. Enable the Site

Link the configuration to the `sites-enabled` directory:

```bash
sudo ln -s /etc/nginx/sites-available/biow-web /etc/nginx/sites-enabled/
```

Test the Nginx configuration for syntax errors:

```bash
sudo nginx -t
```

If the test is successful, restart Nginx:

```bash
sudo systemctl restart nginx
```

Your application should now be live at your domain or IP address.
