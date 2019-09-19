# react-native-Unsplash-example

## Install
 Follow installation of [React-Native CLI QuickStart](https://facebook.github.io/react-native/docs/getting-started)

```
brew install yarn
brew install node
brew install watchman
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8

npm install -g react-native-cli

1. Install Android Studio
2. Install the Android SDK
3. Configure the ANDROID_HOME environment variable
```
### iOS
```
yarn
cd ios && pod install
cd .. & react-native run-ios
```

### Android
```
yarn
npx jetifier
npx react-native run-android
```

## Known Issues
On android version, currently there is known issue of carousel. please refer to [this](https://github.com/archriss/react-native-snap-carousel#known-issues).
Trying to fix it now.

## Running on iOS(video capture)
https://www.dropbox.com/s/ap2cizav6285czp/react-native-unsplash.mov?dl=0