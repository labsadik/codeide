import React from 'react';

// VS Code-style SVG icons for different file types
export const icons = {
  // JavaScript
  javascript: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <rect x="2" y="2" width="28" height="28" rx="1.312" fill="#F5DE19"/>
      <path d="M20.809,23.875a2.866,2.866,0,0,0,2.6,1.6c1.09,0,1.787-.545,1.787-1.3,0-.9-.716-1.222-1.916-1.747l-.658-.282c-1.9-.809-3.16-1.822-3.16-3.964,0-1.973,1.5-3.476,3.853-3.476a3.889,3.889,0,0,1,3.742,2.107L25,18.128A1.789,1.789,0,0,0,23.311,17a1.145,1.145,0,0,0-1.259,1.128c0,.789.489,1.109,1.618,1.6l.658.282c2.236.959,3.5,1.936,3.5,4.133,0,2.369-1.861,3.667-4.36,3.667a5.055,5.055,0,0,1-4.795-2.691Zm-9.295.228c.413.733.789,1.353,1.693,1.353.864,0,1.41-.338,1.41-1.653V14.856h2.631v8.982c0,2.724-1.6,3.964-3.929,3.964a4.085,4.085,0,0,1-3.947-2.4Z" fill="#1A1A1A"/>
    </svg>
  ),
  
  // TypeScript
  typescript: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <rect x="2" y="2" width="28" height="28" rx="1.312" fill="#3178C6"/>
      <path d="M18.245,23.759v3.068a6.492,6.492,0,0,0,1.764.575,11.56,11.56,0,0,0,2.146.192,9.968,9.968,0,0,0,2.088-.211,5.11,5.11,0,0,0,1.735-.7,3.542,3.542,0,0,0,1.181-1.266,4.469,4.469,0,0,0,.186-3.394,3.409,3.409,0,0,0-.717-1.117,5.236,5.236,0,0,0-1.123-.877,12.027,12.027,0,0,0-1.477-.734q-.6-.249-1.08-.484a5.5,5.5,0,0,1-.813-.479,2.089,2.089,0,0,1-.516-.518,1.091,1.091,0,0,1-.181-.618,1.039,1.039,0,0,1,.162-.571,1.4,1.4,0,0,1,.459-.436,2.439,2.439,0,0,1,.726-.283,4.211,4.211,0,0,1,.956-.1,5.942,5.942,0,0,1,.808.058,6.292,6.292,0,0,1,.856.177,5.994,5.994,0,0,1,.836.3,4.657,4.657,0,0,1,.751.422V13.327a7.54,7.54,0,0,0-1.525-.4,12.426,12.426,0,0,0-1.9-.129,8.767,8.767,0,0,0-2.064.235,5.239,5.239,0,0,0-1.716.733,3.655,3.655,0,0,0-1.171,1.271,3.731,3.731,0,0,0-.431,1.845,3.588,3.588,0,0,0,.789,2.34,6,6,0,0,0,2.395,1.639q.63.26,1.175.509a6.458,6.458,0,0,1,.942.517,2.463,2.463,0,0,1,.626.585,1.2,1.2,0,0,1,.23.719,1.1,1.1,0,0,1-.144.552,1.269,1.269,0,0,1-.435.441,2.381,2.381,0,0,1-.726.292,4.377,4.377,0,0,1-1.018.105,5.773,5.773,0,0,1-1.969-.35A6.348,6.348,0,0,1,18.245,23.759ZM14.576,14.156H10v2.527h4.576v11.111h2.894V16.683h4.576V14.156Z" fill="#FFF"/>
    </svg>
  ),
  
  // React (JSX/TSX)
  react: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <circle cx="16" cy="15.974" r="2.5" fill="#00D8FF"/>
      <path d="M16,21.706a28.385,28.385,0,0,1-8.88-1.2,11.3,11.3,0,0,1-3.657-1.958A3.543,3.543,0,0,1,2,15.974c0-1.653,1.816-3.273,4.858-4.333A28.755,28.755,0,0,1,16,10.293a28.674,28.674,0,0,1,9.022,1.324,11.376,11.376,0,0,1,3.538,1.866A3.391,3.391,0,0,1,30,15.974c0,1.718-2.03,3.459-5.3,4.541A28.8,28.8,0,0,1,16,21.706Zm0-10.217a27.948,27.948,0,0,0-8.749,1.282c-2.8.977-4.055,2.313-4.055,3.2,0,.928,1.349,2.387,4.311,3.4A27.21,27.21,0,0,0,16,20.51a27.6,27.6,0,0,0,8.325-1.13C27.4,18.361,28.8,16.9,28.8,15.974a2.327,2.327,0,0,0-1.01-1.573,10.194,10.194,0,0,0-3.161-1.654A27.462,27.462,0,0,0,16,11.489Z" fill="#00D8FF"/>
      <path d="M10.32,28.443a2.639,2.639,0,0,1-1.336-.328c-1.432-.826-1.928-3.208-1.327-6.373a28.755,28.755,0,0,1,3.4-8.593,28.676,28.676,0,0,1,5.653-7.154,11.376,11.376,0,0,1,3.384-2.133,3.391,3.391,0,0,1,2.878,0c1.489.858,1.982,3.486,1.287,6.859a28.806,28.806,0,0,1-3.316,8.133,28.385,28.385,0,0,1-5.476,7.093,11.3,11.3,0,0,1-3.523,2.189A4.926,4.926,0,0,1,10.32,28.443Zm1.773-14.7a27.948,27.948,0,0,0-3.26,8.219c-.553,2.915-.022,4.668.75,5.114.8.463,2.742.024,5.1-2.036a27.209,27.209,0,0,0,5.227-6.79,27.6,27.6,0,0,0,3.181-7.776c.654-3.175.089-5.119-.713-5.581a2.327,2.327,0,0,0-1.868.089A10.194,10.194,0,0,0,17.5,6.9a27.464,27.464,0,0,0-5.4,6.849Z" fill="#00D8FF"/>
      <path d="M21.677,28.456c-1.355,0-3.076-.82-4.868-2.361a28.756,28.756,0,0,1-5.747-7.237,28.676,28.676,0,0,1-3.374-8.471,11.376,11.376,0,0,1-.158-4A3.391,3.391,0,0,1,8.964,3.9c1.487-.861,4.01.024,6.585,2.31a28.8,28.8,0,0,1,5.39,6.934,28.384,28.384,0,0,1,3.41,8.287,11.3,11.3,0,0,1,.137,4.146,3.543,3.543,0,0,1-1.494,2.555A2.59,2.59,0,0,1,21.677,28.456Zm-9.58-10.2a27.949,27.949,0,0,0,5.492,6.929c2.249,1.935,4.033,2.351,4.8,1.9.8-.465,1.39-2.363.782-5.434A27.212,27.212,0,0,0,19.9,13.74,27.6,27.6,0,0,0,14.755,7.1c-2.424-2.152-4.39-2.633-5.191-2.169a2.327,2.327,0,0,0-.855,1.662,10.194,10.194,0,0,0,.153,3.565,27.465,27.465,0,0,0,3.236,8.1Z" fill="#00D8FF"/>
    </svg>
  ),
  
  // HTML
  html: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <polygon points="5.902 27.201 3.656 2 28.344 2 26.095 27.197 15.985 30" fill="#E44D26"/>
      <polygon points="16 27.858 24.17 25.593 26.092 4.061 16 4.061" fill="#F16529"/>
      <polygon points="16 13.407 11.91 13.407 11.628 10.242 16 10.242 16 7.151 15.989 7.151 8.25 7.151 8.324 7.981 9.083 16.498 16 16.498" fill="#EBEBEB"/>
      <polygon points="16 21.434 15.986 21.438 12.544 20.509 12.324 18.044 10.651 18.044 9.221 18.044 9.654 22.896 15.986 24.654 16 24.65" fill="#EBEBEB"/>
      <polygon points="15.989 13.407 15.989 16.498 19.795 16.498 19.437 20.507 15.989 21.432 15.989 24.649 22.326 22.896 22.372 22.374 23.098 14.237 23.174 13.407 22.341 13.407" fill="white"/>
      <polygon points="15.989 7.151 15.989 9.071 15.989 10.235 15.989 10.242 23.445 10.242 23.445 10.242 23.455 10.242 23.517 9.548 23.658 7.981 23.732 7.151" fill="white"/>
    </svg>
  ),
  
  // CSS
  css: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <polygon points="5.902 27.201 3.656 2 28.344 2 26.095 27.197 15.985 30" fill="#1572B6"/>
      <polygon points="16 27.858 24.17 25.593 26.092 4.061 16 4.061" fill="#33A9DC"/>
      <polygon points="16 13.191 20.09 13.191 20.372 10.026 16 10.026 16 6.935 16.011 6.935 23.75 6.935 23.676 7.764 22.917 16.282 16 16.282" fill="white"/>
      <polygon points="16.019 21.218 16.005 21.222 12.563 20.292 12.343 17.827 10.67 17.827 9.24 17.827 9.673 22.68 16.005 24.438 16.019 24.434" fill="#EBEBEB"/>
      <polygon points="19.827 16.151 19.455 20.29 16.008 21.22 16.008 24.436 22.344 22.68 22.391 22.158 22.928 16.151" fill="white"/>
      <polygon points="16.011 6.935 16.011 8.855 16.011 10.018 16.011 10.026 8.555 10.026 8.555 10.026 8.545 10.026 8.483 9.331 8.342 7.764 8.268 6.935" fill="#EBEBEB"/>
    </svg>
  ),
  
  // JSON
  json: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <rect x="2" y="2" width="28" height="28" rx="2" fill="#F5DE19"/>
      <path d="M24.163,22.909c-.854.592-2.049.888-3.587.888a6.125,6.125,0,0,1-2.59-.527,4.185,4.185,0,0,1-1.819-1.508L17.8,20.189a2.889,2.889,0,0,0,1.182.955,3.559,3.559,0,0,0,1.559.34,2.128,2.128,0,0,0,1.4-.4,1.3,1.3,0,0,0,.47-1.049,1.3,1.3,0,0,0-.47-1.049,2.128,2.128,0,0,0-1.4-.4H19.3V16.349h1.24a2.128,2.128,0,0,0,1.4-.4,1.3,1.3,0,0,0,.47-1.049,1.3,1.3,0,0,0-.47-1.049,2.128,2.128,0,0,0-1.4-.4,3.559,3.559,0,0,0-1.559.34,2.889,2.889,0,0,0-1.182.955l-1.632-1.573a4.185,4.185,0,0,1,1.819-1.508,6.125,6.125,0,0,1,2.59-.527c1.538,0,2.733.3,3.587.888a2.851,2.851,0,0,1,1.28,2.459A2.77,2.77,0,0,1,23.9,16.36a2.77,2.77,0,0,1,1.543,2.09A2.851,2.851,0,0,1,24.163,22.909Z" fill="#1A1A1A"/>
      <path d="M10.576,13.449H8.163V11.1h4.857V22.8H10.576Z" fill="#1A1A1A"/>
    </svg>
  ),
  
  // Python
  python: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <defs>
        <linearGradient id="py1" x1="12.059" y1="2.091" x2="26.126" y2="22.532" gradientUnits="userSpaceOnUse">
          <stop offset="0.115" stopColor="#5A9FD4"/>
          <stop offset="1" stopColor="#306998"/>
        </linearGradient>
        <linearGradient id="py2" x1="5.874" y1="9.468" x2="19.941" y2="29.909" gradientUnits="userSpaceOnUse">
          <stop offset="0.115" stopColor="#FFD43B"/>
          <stop offset="1" stopColor="#FFE873"/>
        </linearGradient>
      </defs>
      <path d="M15.885,2.1c-7.1,0-6.651,3.07-6.651,3.07l.006,3.18H16.1v.95H6.4S2,8.8,2,15.94s3.84,6.89,3.84,6.89h2.29V19.51s-.12-3.84,3.78-3.84h6.51s3.66.06,3.66-3.54V5.92S22.5,2.1,15.885,2.1ZM11.63,4.42a1.29,1.29,0,1,1,0,2.58,1.29,1.29,0,0,1,0-2.58Z" fill="url(#py1)"/>
      <path d="M16.115,29.9c7.1,0,6.651-3.07,6.651-3.07l-.006-3.18H15.9V22.7h9.7S30,23.2,30,16.06s-3.84-6.89-3.84-6.89h-2.29v3.32s.12,3.84-3.78,3.84h-6.51S9.92,16.27,9.92,19.87v6.21S9.5,29.9,16.115,29.9Zm4.255-2.32a1.29,1.29,0,1,1,0-2.58,1.29,1.29,0,0,1,0,2.58Z" fill="url(#py2)"/>
    </svg>
  ),
  
  // Markdown
  markdown: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <rect x="2.5" y="7.955" width="27" height="16.091" rx="2" fill="#755838"/>
      <polygon points="5.909 20.636 5.909 11.364 8.636 11.364 11.364 14.773 14.091 11.364 16.818 11.364 16.818 20.636 14.091 20.636 14.091 15.318 11.364 18.727 8.636 15.318 8.636 20.636" fill="#FFF"/>
      <polygon points="22.955 20.636 18.864 16.136 21.591 16.136 21.591 11.364 24.318 11.364 24.318 16.136 27.045 16.136" fill="#FFF"/>
    </svg>
  ),
  
  // Git
  git: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M29.472,14.753,17.247,2.528a1.8,1.8,0,0,0-2.55,0L12.158,5.067l3.22,3.22a2.141,2.141,0,0,1,2.711,2.73l3.1,3.1a2.143,2.143,0,1,1-1.285,1.21l-2.895-2.895v7.617a2.141,2.141,0,1,1-1.764-.062V12.3a2.146,2.146,0,0,1-1.165-2.814L10.9,6.308,2.528,14.681a1.8,1.8,0,0,0,0,2.553L14.753,29.459a1.8,1.8,0,0,0,2.55,0L29.472,17.29A1.8,1.8,0,0,0,29.472,14.753Z" fill="#DE4C36"/>
    </svg>
  ),
  
  // Package/NPM
  package: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <rect x="2" y="2" width="28" height="28" fill="#CC3534"/>
      <polygon points="5.462 26.538 5.462 5.462 16 5.462 16 26.538 10.731 26.538 10.731 10.731 5.462 26.538" fill="#FFF"/>
      <polygon points="16 5.462 26.538 5.462 26.538 26.538 21.269 26.538 21.269 10.731 16 10.731" fill="#FFF"/>
    </svg>
  ),
  
  // Lock/Env
  lock: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M24,14V10a8,8,0,0,0-16,0v4a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V16A2,2,0,0,0,24,14ZM12,10a4,4,0,0,1,8,0v4H12Zm5,14.72V27a1,1,0,0,1-2,0V24.72A2,2,0,1,1,17,24.72Z" fill="#F5DE19"/>
    </svg>
  ),
  
  // Settings/Config
  config: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M27.526,18.036l-2.09-1.206a9.3,9.3,0,0,0,0-1.66l2.09-1.206a.5.5,0,0,0,.228-.584l-.008-.025a12.013,12.013,0,0,0-2.2-3.794l-.018-.02a.5.5,0,0,0-.6-.114l-2.09,1.206a9.255,9.255,0,0,0-1.438-.83V7.39a.5.5,0,0,0-.383-.486l-.026-.006a12.065,12.065,0,0,0-4.388,0l-.026.006a.5.5,0,0,0-.383.486V9.8a9.438,9.438,0,0,0-1.438.83L12.566,9.427a.5.5,0,0,0-.6.114l-.018.02a12.014,12.014,0,0,0-2.2,3.794l-.008.025a.5.5,0,0,0,.228.584l2.09,1.206a9.3,9.3,0,0,0,0,1.66l-2.09,1.206a.5.5,0,0,0-.228.584l.008.025a12.013,12.013,0,0,0,2.2,3.794l.018.02a.5.5,0,0,0,.6.114l2.09-1.206a9.255,9.255,0,0,0,1.438.83v2.413a.5.5,0,0,0,.383.486l.026.006a12.065,12.065,0,0,0,4.388,0l.026-.006a.5.5,0,0,0,.383-.486V22.2a9.438,9.438,0,0,0,1.438-.83l2.09,1.206a.5.5,0,0,0,.6-.114l.018-.02a12.014,12.014,0,0,0,2.2-3.794l.008-.025A.5.5,0,0,0,27.526,18.036ZM16,19.5A3.5,3.5,0,1,1,19.5,16,3.5,3.5,0,0,1,16,19.5Z" fill="#858585"/>
    </svg>
  ),
  
  // Folder
  folder: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M27.5,26.5H4.5a2,2,0,0,1-2-2V7.5a2,2,0,0,1,2-2h7.28a2,2,0,0,1,1.6.8L15.2,9.5H27.5a2,2,0,0,1,2,2v13A2,2,0,0,1,27.5,26.5Z" fill="#DCB67A"/>
    </svg>
  ),
  
  // Folder Open
  folderOpen: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M28.97,12H9.75L6.11,25.12A2,2,0,0,0,8.03,27.5H25.97a2,2,0,0,0,1.92-1.44l3.64-13.12A1,1,0,0,0,30.57,11.5,1.56,1.56,0,0,0,28.97,12Z" fill="#DCB67A"/>
      <path d="M27.5,11.5H14.2l-1.82-2.43a2,2,0,0,0-1.6-.8H4.5a2,2,0,0,0-2,2V24.5a2,2,0,0,0,2,2H8.03a2,2,0,0,1-1.92-2.38L9.75,11.5H27.5Z" fill="#987B3E"/>
    </svg>
  ),
  
  // Node modules folder
  nodeModules: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M27.5,26.5H4.5a2,2,0,0,1-2-2V7.5a2,2,0,0,1,2-2h7.28a2,2,0,0,1,1.6.8L15.2,9.5H27.5a2,2,0,0,1,2,2v13A2,2,0,0,1,27.5,26.5Z" fill="#8BC500"/>
    </svg>
  ),
  
  // Source folder
  srcFolder: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M27.5,26.5H4.5a2,2,0,0,1-2-2V7.5a2,2,0,0,1,2-2h7.28a2,2,0,0,1,1.6.8L15.2,9.5H27.5a2,2,0,0,1,2,2v13A2,2,0,0,1,27.5,26.5Z" fill="#42A5F5"/>
    </svg>
  ),
  
  // Public folder  
  publicFolder: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M27.5,26.5H4.5a2,2,0,0,1-2-2V7.5a2,2,0,0,1,2-2h7.28a2,2,0,0,1,1.6.8L15.2,9.5H27.5a2,2,0,0,1,2,2v13A2,2,0,0,1,27.5,26.5Z" fill="#FFA726"/>
    </svg>
  ),
  
  // Components folder
  componentsFolder: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M27.5,26.5H4.5a2,2,0,0,1-2-2V7.5a2,2,0,0,1,2-2h7.28a2,2,0,0,1,1.6.8L15.2,9.5H27.5a2,2,0,0,1,2,2v13A2,2,0,0,1,27.5,26.5Z" fill="#AB47BC"/>
    </svg>
  ),

  // File default
  file: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M20.414,2H5V30H27V8.586ZM7,28V4H19v6h6V28Z" fill="#909090"/>
    </svg>
  ),
  
  // Image file
  image: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M27,4.5H5a2,2,0,0,0-2,2v19a2,2,0,0,0,2,2H27a2,2,0,0,0,2-2V6.5A2,2,0,0,0,27,4.5Zm-16,4a2.5,2.5,0,1,1-2.5,2.5A2.5,2.5,0,0,1,11,8.5ZM25.5,24H6.5L12,16l4,5,4-3,5.5,6Z" fill="#26A69A"/>
    </svg>
  ),

  // Video file
  video: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M28,8H20V4a2,2,0,0,0-2-2H14a2,2,0,0,0-2,2V8H4A2,2,0,0,0,2,10V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10A2,2,0,0,0,28,8ZM14,4h4V8H14ZM13,21V15l6,3Z" fill="#F44336"/>
    </svg>
  ),

  // Audio file
  audio: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M27,4.5H5a2,2,0,0,0-2,2v19a2,2,0,0,0,2,2H27a2,2,0,0,0,2-2V6.5A2,2,0,0,0,27,4.5ZM13,22a4,4,0,1,1,4-4V12l6-2v4l-6,2v4A4,4,0,0,1,13,22Z" fill="#E91E63"/>
    </svg>
  ),

  // SCSS/SASS
  scss: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <circle cx="16" cy="16" r="14" fill="#CD6799"/>
      <path d="M23.5,18.5c-.5-.2-1-.4-1.5-.5a7.1,7.1,0,0,0,.5-2c0-1.5-.6-2.3-1.4-2.7a2.8,2.8,0,0,0-2.7.3,9.3,9.3,0,0,0-3.9,4.5c-1,.2-1.9.5-2.8.7-.3-1.2-.5-2.3-.8-3.3-.8-2.7-1.7-4.6-3-4.9s-2.3.5-3.2,1.6A11.9,11.9,0,0,0,3,17c0,.3.1.6.1.9a13.4,13.4,0,0,0,.5,2.7A12,12,0,0,0,6,24.1c3.8,4.9,10.5,5.4,14.8,1.5A8.1,8.1,0,0,0,23.5,18.5ZM8.5,23.5A8.1,8.1,0,0,1,6,20a9.7,9.7,0,0,1-.5-1.5,7.4,7.4,0,0,1-.3-1.5V16a8.5,8.5,0,0,1,1-3c.5-.7.9-1,1.2-.9s.7,1,1.2,2.7c.2.7.4,1.5.6,2.4s.4,1.7.6,2.6a23,23,0,0,0,1.2,4.5A6.8,6.8,0,0,1,8.5,23.5Zm8-6.5a7.3,7.3,0,0,1,2.5-3c.5-.3.9-.3,1.1-.1s.4.6.4,1.2a5.5,5.5,0,0,1-.3,1.5Z" fill="#FFF"/>
    </svg>
  ),

  // YAML
  yaml: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <rect x="2" y="2" width="28" height="28" rx="2" fill="#CB171E"/>
      <text x="16" y="21" fontSize="10" fill="#FFF" textAnchor="middle" fontFamily="monospace" fontWeight="bold">yml</text>
    </svg>
  ),

  // SQL/Database
  database: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <ellipse cx="16" cy="8" rx="10" ry="4" fill="#00758F"/>
      <path d="M6,8v16c0,2.2,4.5,4,10,4s10-1.8,10-4V8" fill="none" stroke="#00758F" strokeWidth="4"/>
      <ellipse cx="16" cy="16" rx="10" ry="4" fill="none" stroke="#00758F" strokeWidth="4"/>
    </svg>
  ),

  // Go
  go: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M5.5,12.5c-.1,0-.1-.1,0-.1l1-.4c.1,0,.1,0,.2,0l8.7.1c.1,0,.1.1,0,.1l-.9.3c-.1,0-.1.1-.2,0Z" fill="#00ACD7"/>
      <path d="M2.5,14.1c-.1,0-.1-.1,0-.1l1-.4c.1,0,.1,0,.2,0l11,.1c.1,0,.2.1.1.1l-.9.3c-.1,0-.1.1-.2.1Z" fill="#00ACD7"/>
      <path d="M7,15.7c-.1,0-.1-.1,0-.1l.7-.4c.1,0,.1,0,.2,0l7,.1c.1,0,.1.1.1.1l-.2.3c0,.1-.1.1-.2.1Z" fill="#00ACD7"/>
      <path d="M24.5,13.2c-.1,0-.1.1-.1.1l-2.3,1c-.1,0-.1.1-.2.1l-3.2-.2c-.1,0-.1-.1-.1-.1l.2-.3c0-.1.1-.1.2-.1l2.4-.2,2.8-.5C24.5,13,24.5,13.1,24.5,13.2Z" fill="#00ACD7"/>
      <path d="M29.5,9c-.1-.1-.2-.1-.3-.1l-7,.8a.2.2,0,0,0-.2.2,6.8,6.8,0,0,1,.8,3.2,6.5,6.5,0,0,1-3.2,5.7,7.1,7.1,0,0,1-4.1.9,6.9,6.9,0,0,1-5.2-2.5A7.2,7.2,0,0,1,8.5,12a7.1,7.1,0,0,1,5.8-6.9l7.1-.8c.1,0,.2-.1.2-.2L21.5,3c0-.1-.1-.2-.2-.1l-7.6.8A9.3,9.3,0,0,0,6.3,8.5,9.2,9.2,0,0,0,6,15a9.3,9.3,0,0,0,7.5,8.5,10.5,10.5,0,0,0,8.3-1.7A9.4,9.4,0,0,0,26,14a9.5,9.5,0,0,0,.8-4.1l2.8-1C29.7,9.1,29.6,9,29.5,9Z" fill="#00ACD7"/>
    </svg>
  ),

  // Rust
  rust: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <circle cx="16" cy="16" r="14" fill="#000"/>
      <path d="M16,4a12,12,0,1,0,12,12A12,12,0,0,0,16,4Zm0,22a10,10,0,1,1,10-10A10,10,0,0,1,16,26ZM14,12h4v8H14Zm-3,4h2v4H11Zm10,0h2v4H21Z" fill="#F74C00"/>
    </svg>
  ),

  // Java
  java: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M12.3,23.5s-1.1.6.8.8a14.4,14.4,0,0,0,5.9-.3l2.1,1.1c-5.3,2.3-12-.1-8.8-1.6Z" fill="#5382A1"/>
      <path d="M11.5,20.5s-1.2,1,.7.9a24.1,24.1,0,0,0,7.6-.4l1.5,1.3C15.4,24,8,22,11.5,20.5Z" fill="#5382A1"/>
      <path d="M17.1,15a2.5,2.5,0,0,0-2.5,2.5c0,.2,1.5-3.1,4.4-.8C21.4,14,18.9,15,17.1,15Z" fill="#5382A1"/>
      <path d="M24.2,25.8s.8.7-.9,1.2c-3.3,1-13.7,1.3-16.6,0-1.1-.5.9-1.2,1.5-1.3l1-.2c-1.1-.8-7.2,1.6-3.1,2.3C17.5,29.5,29.5,27,24.2,25.8Z" fill="#5382A1"/>
      <path d="M13,17.4s-5.1,1.2-1.8,1.6a45.4,45.4,0,0,0,6.8-.1c1.9-.1,3.8-.4,3.8-.4l-1.1.6c-4.5.9-13.2.5-10.7-.5A8.6,8.6,0,0,1,13,17.4Z" fill="#5382A1"/>
      <path d="M21.6,22c4.5-2.4,2.4-4.6,1-4.3l-.5.1a.5.5,0,0,1,.3-.4c2.6-.9,4.6,2.6-.9,4l.1-.4Z" fill="#5382A1"/>
      <path d="M18,2s2.5,2.5-2.4,6.3c-3.9,3.1-.9,4.9,0,6.9-2.3-2.1-4-3.9-2.9-5.6C14.6,6.9,19.2,5.6,18,2Z" fill="#E76F00"/>
      <path d="M13.5,28.9c4.4.3,11.1-.2,11.3-2.4,0,0-.3.8-3.6,1.4a33.7,33.7,0,0,1-11,.4c-2.2-.4,1-.9,1-.9s-4.3.4-4.3,2.7C6.9,30.1,11.7,29.5,13.5,28.9Z" fill="#5382A1"/>
    </svg>
  ),

  // C/C++
  cpp: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,25A11,11,0,1,1,27,16,11,11,0,0,1,16,27Z" fill="#00599C"/>
      <path d="M16,8a8,8,0,1,0,8,8A8,8,0,0,0,16,8Zm0,14a6,6,0,1,1,6-6A6,6,0,0,1,16,22Z" fill="#00599C"/>
      <polygon points="20 14 20 12 18 12 18 14 16 14 16 16 18 16 18 18 20 18 20 16 22 16 22 14" fill="#00599C"/>
      <polygon points="28 14 28 12 26 12 26 14 24 14 24 16 26 16 26 18 28 18 28 16 30 16 30 14" fill="#00599C"/>
    </svg>
  ),

  // PHP
  php: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <ellipse cx="16" cy="16" rx="14" ry="8" fill="#8993BE"/>
      <path d="M9,14h2l.5-2H10l.2-.5A.5.5,0,0,1,10.6,11H12l.5-2H10.2a2.5,2.5,0,0,0-2.4,1.8L7.3,12H6L5.5,14H7l-.5,2A2.5,2.5,0,0,0,9,19H11l.5-2H10A.5.5,0,0,1,9.5,16.5Z" fill="#232531"/>
      <path d="M17,11H13.5L11.5,21h2l1-4h1.5a2.5,2.5,0,0,0,2.4-1.8l.6-2.4A1.5,1.5,0,0,0,17.5,11Zm.5,2.5-.3,1.2a.5.5,0,0,1-.5.3H15l.5-2h1.5A.5.5,0,0,1,17.5,13.5Z" fill="#232531"/>
      <path d="M25,11H21.5L19.5,21h2l1-4h1.5a2.5,2.5,0,0,0,2.4-1.8l.6-2.4A1.5,1.5,0,0,0,25.5,11Zm.5,2.5-.3,1.2a.5.5,0,0,1-.5.3H23l.5-2h1.5A.5.5,0,0,1,25.5,13.5Z" fill="#232531"/>
    </svg>
  ),

  // Ruby
  ruby: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <polygon points="20 2 30 12 25 30 7 30 2 12" fill="#CC342D"/>
      <polygon points="16 28 25 28 29 14 22 7" fill="#B22B27"/>
      <polygon points="16 28 22 7 16 2 10 7 7 28" fill="#F99"/>
    </svg>
  ),

  // Swift
  swift: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M26,26c-5,5-12,4-12,4s-9-3-12-11c-1-3,0-7,3-10s7-4,10-3l-1,2a5.5,5.5,0,0,0-6,2c-2,2-2,5-1,7C9,21,14,25,18,26a9,9,0,0,0,6-2c1-1,2-3,2-5l-4,4-7-7c5,3,9,2,13-2S31,21,26,26Z" fill="#F05138"/>
    </svg>
  ),

  // Docker
  docker: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M31.5,14.5c-1.5-1-4.5-1-6-.5a7.5,7.5,0,0,0-3-5.5l-1-.5-.5,1a7.5,7.5,0,0,0-1,4c.1,1.5.5,3,1.5,4a8.5,8.5,0,0,1-5,1H.5l-.5.5A11.5,11.5,0,0,0,1.5,26c2,3,5,4.5,9,4.5,7,0,12.5-3.5,15-10a5,5,0,0,0,5-3l.5-1ZM4,16H7v3H4Zm4,0h3v3H8Zm4,0h3v3H12Zm4,0h3v3H16Zm-8,4h3v3H8Zm4,0h3v3H12Zm4,0h3v3H16Zm4-4h3v3H20Zm-8-4h3v3H12Zm4,0h3v3H16Zm4,0h3v3H20Z" fill="#0DB7ED"/>
    </svg>
  ),

  // Shell/Terminal
  terminal: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <rect x="3" y="6" width="26" height="20" rx="2" fill="#4D4D4D"/>
      <path d="M8,22l5-5L8,12" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <line x1="16" y1="22" x2="24" y2="22" fill="none" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),

  // Vue
  vue: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <polygon points="16 5.5 20.5 5.5 16 12.5 11.5 5.5" fill="#35495E"/>
      <polygon points="16 26.5 2 5.5 8 5.5 16 18 24 5.5 30 5.5" fill="#41B883"/>
    </svg>
  ),

  // Angular
  angular: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <polygon points="16 2 3 7 5 23 16 30 27 23 29 7" fill="#DD0031"/>
      <polygon points="16 2 16 5 16 5 16 19 16 30 27 23 29 7" fill="#C3002F"/>
      <polygon points="16 5 10 19 12.5 19 13.6 16 18.4 16 19.5 19 22 19" fill="#FFF"/>
      <polygon points="16 8.5 18 14 14 14" fill="#DD0031"/>
    </svg>
  ),

  // Svelte
  svelte: (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 32 32" {...props}>
      <path d="M26.5,6C22.5,1,15,1.5,11,5L5.5,9A7.5,7.5,0,0,0,4,14.5,7.5,7.5,0,0,0,5.5,20,6.5,6.5,0,0,0,5,23.5,7,7,0,0,0,6.5,28c4,5,11.5,4.5,15.5.5L27.5,24A7.5,7.5,0,0,0,29,18.5,7.5,7.5,0,0,0,27.5,13,6.5,6.5,0,0,0,28,9.5,7,7,0,0,0,26.5,6Z" fill="#FF3E00"/>
      <path d="M13.5,26.5a5.5,5.5,0,0,1-5.5-5,4.5,4.5,0,0,1,.5-2l.5-1L9.5,19A4.5,4.5,0,0,0,12,19.5h.5l1-.5,5.5-3.5a3.5,3.5,0,0,0,1.5-2,3,3,0,0,0-.5-2,3.5,3.5,0,0,0-4,0L14,13l-1.5,1A6.5,6.5,0,0,1,9.5,15,5.5,5.5,0,0,1,4,10a4.5,4.5,0,0,1,.5-2l.5-1,.5-.5L11,3A5.5,5.5,0,0,1,17,3a4.5,4.5,0,0,1,1.5,3.5l-.5,2-.5,1-.5.5A4.5,4.5,0,0,0,14.5,9.5H14l-1,.5L7.5,13.5a3.5,3.5,0,0,0-1.5,2,3,3,0,0,0,.5,2,3.5,3.5,0,0,0,4,0L12.5,16l1.5-1a6.5,6.5,0,0,1,3-1,5.5,5.5,0,0,1,5.5,5,4.5,4.5,0,0,1-.5,2l-.5,1-.5.5L15.5,26A5.5,5.5,0,0,1,13.5,26.5Z" fill="#FFF"/>
    </svg>
  ),
};

// Language detection map for all programming languages
export const languageMap: Record<string, string> = {
  // JavaScript/TypeScript
  js: 'javascript',
  jsx: 'javascript',
  mjs: 'javascript',
  cjs: 'javascript',
  ts: 'typescript',
  tsx: 'typescript',
  mts: 'typescript',
  cts: 'typescript',
  
  // Web
  html: 'html',
  htm: 'html',
  xhtml: 'html',
  css: 'css',
  scss: 'scss',
  sass: 'scss',
  less: 'less',
  styl: 'stylus',
  
  // Data formats
  json: 'json',
  jsonc: 'jsonc',
  json5: 'json5',
  yaml: 'yaml',
  yml: 'yaml',
  toml: 'toml',
  xml: 'xml',
  xsl: 'xml',
  xslt: 'xml',
  svg: 'xml',
  
  // Python
  py: 'python',
  pyw: 'python',
  pyi: 'python',
  pyx: 'python',
  pxd: 'python',
  
  // Java/JVM
  java: 'java',
  kt: 'kotlin',
  kts: 'kotlin',
  scala: 'scala',
  groovy: 'groovy',
  gradle: 'groovy',
  clj: 'clojure',
  cljs: 'clojure',
  
  // C family
  c: 'c',
  h: 'c',
  cpp: 'cpp',
  cxx: 'cpp',
  cc: 'cpp',
  hpp: 'cpp',
  hxx: 'cpp',
  hh: 'cpp',
  cs: 'csharp',
  csx: 'csharp',
  m: 'objective-c',
  mm: 'objective-cpp',
  
  // Systems programming
  rs: 'rust',
  go: 'go',
  zig: 'zig',
  nim: 'nim',
  
  // Scripting
  rb: 'ruby',
  erb: 'erb',
  rake: 'ruby',
  gemspec: 'ruby',
  php: 'php',
  php3: 'php',
  php4: 'php',
  php5: 'php',
  phtml: 'php',
  pl: 'perl',
  pm: 'perl',
  lua: 'lua',
  r: 'r',
  rmd: 'rmd',
  
  // Mobile
  swift: 'swift',
  dart: 'dart',
  
  // Shell
  sh: 'shell',
  bash: 'shell',
  zsh: 'shell',
  fish: 'shell',
  ps1: 'powershell',
  psm1: 'powershell',
  bat: 'bat',
  cmd: 'bat',
  
  // Functional
  hs: 'haskell',
  lhs: 'haskell',
  ml: 'fsharp',
  mli: 'fsharp',
  fs: 'fsharp',
  fsi: 'fsharp',
  fsx: 'fsharp',
  ex: 'elixir',
  exs: 'elixir',
  erl: 'erlang',
  hrl: 'erlang',
  elm: 'elm',
  
  // Database
  sql: 'sql',
  mysql: 'sql',
  pgsql: 'pgsql',
  plsql: 'plsql',
  
  // Markup/Documentation
  md: 'markdown',
  markdown: 'markdown',
  mdx: 'mdx',
  rst: 'restructuredtext',
  tex: 'latex',
  latex: 'latex',
  adoc: 'asciidoc',
  asciidoc: 'asciidoc',
  
  // Config
  ini: 'ini',
  cfg: 'ini',
  conf: 'ini',
  properties: 'properties',
  env: 'dotenv',
  editorconfig: 'editorconfig',
  
  // DevOps/Infra
  dockerfile: 'dockerfile',
  docker: 'dockerfile',
  tf: 'hcl',
  hcl: 'hcl',
  vagrantfile: 'ruby',
  makefile: 'makefile',
  cmake: 'cmake',
  
  // GraphQL
  graphql: 'graphql',
  gql: 'graphql',
  
  // Misc
  proto: 'protobuf',
  prisma: 'prisma',
  sol: 'solidity',
  vy: 'vyper',
  wasm: 'wat',
  wat: 'wat',
  asm: 'asm',
  s: 'asm',
};

// Icon mapping for files
export function getVSCodeIcon(filename: string, type: 'file' | 'folder', isOpen?: boolean): React.ReactNode {
  const lowerName = filename.toLowerCase();
  
  // Special folder icons
  if (type === 'folder') {
    const folderIconMap: Record<string, keyof typeof icons> = {
      'node_modules': 'nodeModules',
      'src': 'srcFolder',
      'source': 'srcFolder',
      'public': 'publicFolder',
      'static': 'publicFolder',
      'assets': 'publicFolder',
      'components': 'componentsFolder',
      'lib': 'srcFolder',
      'utils': 'srcFolder',
      'hooks': 'srcFolder',
      'pages': 'srcFolder',
      'views': 'srcFolder',
      'api': 'srcFolder',
      'services': 'srcFolder',
      'styles': 'componentsFolder',
      'tests': 'srcFolder',
      '__tests__': 'srcFolder',
      'dist': 'publicFolder',
      'build': 'publicFolder',
      '.git': 'git',
    };
    
    const folderIcon = folderIconMap[lowerName];
    if (folderIcon && icons[folderIcon]) {
      const Icon = icons[folderIcon];
      return <Icon className="w-4 h-4" />;
    }
    
    const FolderIcon = isOpen ? icons.folderOpen : icons.folder;
    return <FolderIcon className="w-4 h-4" />;
  }
  
  // Special file icons by name
  const specialFileMap: Record<string, keyof typeof icons> = {
    'package.json': 'package',
    'package-lock.json': 'lock',
    'yarn.lock': 'lock',
    'pnpm-lock.yaml': 'lock',
    'bun.lockb': 'lock',
    'tsconfig.json': 'typescript',
    'jsconfig.json': 'javascript',
    '.gitignore': 'git',
    '.gitattributes': 'git',
    '.gitmodules': 'git',
    '.env': 'lock',
    '.env.local': 'lock',
    '.env.development': 'lock',
    '.env.production': 'lock',
    '.env.example': 'lock',
    'dockerfile': 'docker',
    'docker-compose.yml': 'docker',
    'docker-compose.yaml': 'docker',
    'readme.md': 'markdown',
    'readme': 'markdown',
    'license': 'file',
    'license.md': 'markdown',
    'makefile': 'terminal',
    'cmakelists.txt': 'config',
    'vite.config.ts': 'config',
    'vite.config.js': 'config',
    'webpack.config.js': 'config',
    'rollup.config.js': 'config',
    'babel.config.js': 'config',
    '.babelrc': 'config',
    '.eslintrc': 'config',
    '.eslintrc.js': 'config',
    '.eslintrc.json': 'config',
    'eslint.config.js': 'config',
    '.prettierrc': 'config',
    'prettier.config.js': 'config',
    'tailwind.config.js': 'config',
    'tailwind.config.ts': 'config',
    'postcss.config.js': 'config',
    'index.html': 'html',
  };
  
  if (specialFileMap[lowerName]) {
    const IconComponent = icons[specialFileMap[lowerName]];
    return <IconComponent className="w-4 h-4" />;
  }
  
  // Get extension
  const parts = filename.split('.');
  const ext = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
  
  // Map extension to icon
  const extIconMap: Record<string, keyof typeof icons> = {
    // JavaScript/TypeScript
    js: 'javascript',
    mjs: 'javascript',
    cjs: 'javascript',
    jsx: 'react',
    ts: 'typescript',
    mts: 'typescript',
    cts: 'typescript',
    tsx: 'react',
    
    // Web
    html: 'html',
    htm: 'html',
    css: 'css',
    scss: 'scss',
    sass: 'scss',
    less: 'css',
    
    // Data
    json: 'json',
    jsonc: 'json',
    yaml: 'yaml',
    yml: 'yaml',
    xml: 'file',
    
    // Languages
    py: 'python',
    pyw: 'python',
    java: 'java',
    kt: 'java',
    scala: 'java',
    c: 'cpp',
    cpp: 'cpp',
    cxx: 'cpp',
    cc: 'cpp',
    h: 'cpp',
    hpp: 'cpp',
    cs: 'cpp',
    go: 'go',
    rs: 'rust',
    rb: 'ruby',
    php: 'php',
    swift: 'swift',
    dart: 'file',
    
    // Shell
    sh: 'terminal',
    bash: 'terminal',
    zsh: 'terminal',
    fish: 'terminal',
    ps1: 'terminal',
    bat: 'terminal',
    cmd: 'terminal',
    
    // Markdown
    md: 'markdown',
    mdx: 'markdown',
    
    // Database
    sql: 'database',
    
    // Images
    png: 'image',
    jpg: 'image',
    jpeg: 'image',
    gif: 'image',
    svg: 'image',
    webp: 'image',
    ico: 'image',
    bmp: 'image',
    
    // Video/Audio
    mp4: 'video',
    webm: 'video',
    mov: 'video',
    avi: 'video',
    mp3: 'audio',
    wav: 'audio',
    ogg: 'audio',
    flac: 'audio',
    
    // Frameworks
    vue: 'vue',
    svelte: 'svelte',
    
    // Config
    env: 'lock',
    lock: 'lock',
    dockerfile: 'docker',
  };
  
  if (extIconMap[ext] && icons[extIconMap[ext]]) {
    const IconComponent = icons[extIconMap[ext]];
    return <IconComponent className="w-4 h-4" />;
  }
  
  // Default file icon
  return <icons.file className="w-4 h-4" />;
}

// Get language from filename
export function getLanguageFromFilename(filename: string): string {
  const parts = filename.split('.');
  const ext = parts.length > 1 ? parts[parts.length - 1].toLowerCase() : '';
  return languageMap[ext] || 'plaintext';
}
