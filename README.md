# Musify

Musify is a web-based music streaming application built with HTML, CSS, and JavaScript. This platform allows users to explore, search, and play their favorite music with an intuitive and responsive interface.

## 🎵 Features

- **Responsive Design**: Fully responsive UI that works seamlessly across desktop, tablet, and mobile devices
- **Music Player**: Audio player with play/pause, volume control, and timeline functionality
- **User Authentication**: Login and signup functionality
- **Multiple Pages**: Different sections for about, contact, kids section, and more
- **Error Handling**: Custom 404 error page
- **Music Collection**: Organized music library with metadata

## 💻 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Audio**: Native HTML5 audio capabilities
- **Styling**: Custom CSS.
- **Data**: JSON for song metadata.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- A modern web browser
- Basic code editor (VS Code, Sublime Text, etc.)
- Local server environment (optional, for testing)

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/fordeploy7/musifydeploy.git
   cd musifydeploy
   ```

2. **Run locally**
   - Open `index.html` in your browser directly
   - Or use a local server:
     ```bash
     npx http-server
     ```
     Then navigate to `http://localhost:8080` in your browser

## 📁 Project Structure

```
musifydeploy/
├── css/                   # CSS stylesheets
├── fonts/                 # Custom font files
├── images/                # Images for the website
├── img/                   # Additional image assets
├── js/                    # JavaScript files
├── node_modules/          # Node.js dependencies
├── songs/                 # Music files
├── .DS_Store              # macOS system file (can be ignored)
├── 404errorpage.html      # Custom error page
├── README.md              # Project documentation
├── about.html             # About page
├── audio.css              # Audio player styles
├── contactpage.html       # Contact page
├── index.html             # Main homepage
├── into.html              # Introduction page
├── kids-section.html      # Kids section
├── login.html             # User login page
├── package-lock.json      # NPM package lock
├── package.json           # Project dependencies
├── signup.html            # User registration page
└── songs.json             # Song metadata
```

## 📄 Pages Description

- **index.html**: Main homepage with featured music and navigation
- **about.html**: Information about the platform and its creators
- **contactpage.html**: Contact form and information
- **login.html**: User authentication page
- **signup.html**: New user registration
- **kids-section.html**: Child-friendly music section
- **into.html**: Introduction/welcome page
- **404errorpage.html**: Custom error page for broken links

## 🎧 Music Player Features

- Play/Pause functionality
- Volume control
- Progress bar for tracking song playback
- Song information display
- Playlist navigation

## 🔒 Authentication

- User registration via signup.html
- Login functionality via login.html
- Basic user profile management
- using firebase AUTH

## 🚀 Deployment

The project has been set up for deployment, as indicated by the "deploy" commits in the repository. To deploy this project:

1. **Using GitHub Pages**:
   - Enable GitHub Pages in your repository settings
   - Select the main branch as the source

2. **Using any static site hosting**:
   - Upload all files to your web hosting service
   - Ensure the directory structure is maintained

3. **Using Node.js based hosting** (if using the package.json):
   - Deploy to services like Vercel, Netlify, or Heroku
   - Follow the hosting service's documentation for deployment

## 🤝 Contributing

When contributing to this project, please follow these guidelines:

### How to Contribute

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Naming Conventions

- **Branches**: Use prefixes like `feature/`, `bugfix/`, `docs/` followed by a descriptive name
- **Commits**: Write clear, concise commit messages in present tense
- **Functions**: Use camelCase for function names (e.g., `playAudio()`, `toggleMenu()`)
- **Files**: Use lowercase with hyphens for file names (e.g., `audio-player.js`, `user-profile.html`)

### Documenting Contributions

When submitting a pull request, please include:

1. **Description**: A clear explanation of what your code does
2. **Issue reference**: Link to any related issues (e.g., `Fixes #123`)
3. **Changes made**: A bullet-point list of main changes
4. **Screenshots**: If applicable, include before/after screenshots
5. **Testing**: Explain how you tested your changes

For substantial contributions, update the README with your new feature and add yourself to the list of contributors in your pull request.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgements

- Font Awesome for icons (if used)
- Google Fonts (if used)
- Any third-party libraries used in the JavaScript
- Open source audio files (if applicable)