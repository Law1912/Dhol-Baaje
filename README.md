# Dhol Baaje - Rhythmic NFTs

## Overview

Dhol Baaje is a decentralized application (DApp) that empowers artists to upload their music tracks and receive valuations from the community. Users can discover and explore a wide variety of music, support artists, and engage with a vibrant musical ecosystem.

## Features

* **Track Uploads** : Artists can upload their music tracks securely to the decentralized platform.
* **Community Valuation** : Users in the community can listen to tracks and provide valuations for the uploaded music.
* **Music Discovery** : Discover a diverse collection of music, including tracks from emerging and established artists.
* **Decentralized and Secure** : Built on blockchain technology, ensuring decentralization and enhanced security for both artists and users.

## Acknowledgments

We would like to extend our appreciation to the [Logosphere](https://github.com/ikigai-github/logosphere) library, a tool integration platform, for seamlessly integrating essential tools and capabilities that have significantly contributed to the development of this project. Our heartfelt thanks to the Logosphere team for their exceptional work and dedication!

## Installation

Follow these steps to install and set up Dhol Baaje on your local environment.

### Step 1: Install Package Manager

Install pnpm, a package manager, if not already installed.

```
npm install -g pnpm
```

### Step 2: Install Nx

```
pnpm install -g nx@15.4.4
```

### Step 3: Install Dependencies

Install project dependencies using pnpm.

```
pnpm install
```

### Step 4: Initialize Logosphere SDK

Initialize the Logosphere SDK using pnpm and Nx.

```
pnpm nx g @logosphere/sdk:init
```

### Step 5: Build the Application

Build the Dhol Baaje application.

```
pnpm nx affected:build
```

### Step 6: Configure Logosphere API for Music

Configure the Logosphere API module for music.

```
pnpm nx g @logosphere/sdk:api --module music
```

### Step 7: Change the /path/to/install/libs/music-gen/src/resolvers/track.resolver.ts

Search for **FindOneByUsername** and replace all its occurances by **FindOneByEmail**.

### Step 8: Set Environment Variables

Set the necessary environment variables for the application.

### Step 9: Run the Application

Start the application using Docker Compose.

```
docker-compose up -d
```
