
# Insta Downloader

Insta Downloader is a React application built with Vite. It allows users to download Instagram posts.

## Installation

Before you start, make sure you have Node.js and npm installed on your machine.

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/insta-downloader.git
   ```

2. Navigate into the project directory:
   ```bash
   cd insta-downloader
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Development Proxy

During development, we use Vite's built-in proxy to avoid CORS issues. The proxy is configured in `vite.config.js`.

To change the proxy target, open `vite.config.js` and find the `proxy` option:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://safe-dusk-18400-bc6e0d3dfe3f.herokuapp.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
```

Replace `https://safe-dusk-18400-bc6e0d3dfe3f.herokuapp.com` with the URL of your own backend server.

This proxy configuration tells Vite to route any requests from `/api` to `https://safe-dusk-18400-bc6e0d3dfe3f.herokuapp.com/`. The `rewrite` option removes the `/api` prefix from the request path.

Remember to restart your development server after changing the proxy configuration.

Additionally, make sure to update your API fetch requests in your React code. For development, replace the hardcoded server URL with `/api`:

```javascript
fetch("/api/data", { ... });
```

This ensures that the proxy configuration is used during development, avoiding CORS issues.

## Running the Application

To start the development server, run:
```bash
npm run dev
```

To build the application for production, run:
```bash
npm run build
```

To preview the production build, run:
```bash
npm run preview
```

## Tech Stack

- React
- Vite
- Heroku (for the backend)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [MIT](https://choosealicense.com/licenses/mit/) license for more information.
