# Raghusrinivasan Venkatesan | Portfolio

A modern, responsive personal portfolio website built with vanilla HTML, CSS, and JavaScript.

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

- **Modern Dark Theme** - Sleek design with gradient accents and glassmorphism effects
- **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **Data-Driven Content** - Easy updates through `data.json` without touching HTML
- **Smooth Animations** - Scroll-triggered fade-in effects and hover interactions
- **Fast & Lightweight** - No frameworks, just vanilla code (~50KB total)

## 📁 Project Structure

```
codeFafnir.github.io/
├── index.html      # Main HTML structure
├── style.css       # All styles and animations
├── script.js       # Interactivity and data loading
├── data.json       # Content configuration (edit this!)
├── assets/         # Images and media
└── README.md       # This file
```

## 🚀 Quick Start

### View Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/codeFafnir/codeFafnir.github.io.git
   cd codeFafnir.github.io
   ```

2. Open with a local server (required for data.json loading):
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Or using Node.js
   npx serve
   ```

3. Open `http://localhost:8000` in your browser

### Deploy to GitHub Pages

1. Push your changes to the `main` branch
2. Go to Repository Settings → Pages
3. Select "Deploy from a branch" → `main` → `/ (root)`
4. Your site will be live at `https://codeFafnir.github.io`

## ✏️ Customization

### Update Your Information

Edit `data.json` to update:

- **Personal Info** - Name, title, bio, email, location
- **Social Links** - GitHub, LinkedIn, Twitter URLs
- **Skills** - Languages, frameworks, tools, domains
- **Projects** - Title, description, technologies, links
- **Experience** - Work history with descriptions
- **Education** - Degrees and institutions

### Add Your Photo

1. Add your photo to the `assets/` folder
2. In `index.html`, find the `.about-image` section
3. Replace the placeholder with:
   ```html
   <img src="assets/your-photo.jpg" alt="Your Name">
   ```

### Change Colors

Edit the CSS variables in `style.css`:

```css
:root {
  --accent-primary: #6366f1;    /* Main accent color */
  --accent-secondary: #8b5cf6;  /* Secondary accent */
  --accent-tertiary: #06b6d4;   /* Tertiary accent */
  --bg-primary: #0a0a0f;        /* Background color */
}
```

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Styling, animations, responsive design |
| JavaScript (ES6+) | Interactivity, data loading |
| [Lucide Icons](https://lucide.dev) | Beautiful open-source icons |
| [Google Fonts](https://fonts.google.com) | Inter + JetBrains Mono |

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contact

- **Email**: r1venkatesan@ucsd.edu
- **GitHub**: [@codeFafnir](https://github.com/codeFafnir)
- **LinkedIn**: [Connect with me](#)

---

<p align="center">
  Crafted with ❤️ by Raghusrinivasan Venkatesan
</p>
