# 🖼️ Ghost Image Exporter Tool

A NodeJS utility to download and organize images from a Ghost blog export file.

## 📝 Description

This tool helps you migrate images from a Ghost blog by:

- Reading a Ghost export file (JSON)
- Extracting all image URLs from posts
- Creating an organized folder structure
- Downloading all images locally
- Easy copy / paste folder structure to your Ghost instance

## 🚀 Getting Started

### Prerequisites

- Node.js (v22.13 or higher)
- pnpm or yarn
- A Ghost blog export file (JSON format)

### Installation

1. Clone this repository:

```bash
$ git clone <repository-url>
$ cd ghost-image-migration
```

2. Install dependencies:

```bash
$ pnpm install
```

Or

```bash
$ yarn install
```

3. Create a `.env` file in the root directory (optional): `GHOST_BASE_URL="https://y.x.com"`

4. Place your Ghost export file as `data.json` in the root directory

## 🎯 Usage

Run the migration tool:

```bash
$ pnpm start
```

The tool will:

1. Create the necessary folder structure
2. Extract image URLs from all posts
3. Create individual folders for images
4. Download all images to their respective folders

## 📁 Folder Structure

The tool will create the following folder structure for your images, same as Ghost file structure:

root  
└── .temp  
└──── content  
└────── images  
└──────── {year}  
└────────── {month}  
└──────────── {filename}
