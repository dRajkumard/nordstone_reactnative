package com.nordstone;

import com.facebook.react.shell.MainReactPackage;

import com.facebook.react.modules.core.PermissionListener;
import android.app.Application;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactNativeHost;
import com.facebook.soloader.SoLoader;

// import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage; // Import the Firebase Messaging package
// import com.facebook.react.modules.image.ImagePipelineFactory;
import java.util.List;
// import java.util.Arrays; // Import the Arrays class

public class MainApplication extends Application implements ReactApplication {
  private PermissionListener permissionListener;

  private final ReactNativeHost mReactNativeHost = new DefaultReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }
    @Override
    protected List<ReactPackage> getPackages() {
      @SuppressWarnings("UnnecessaryLocalVariable")
      List<ReactPackage> packages = new PackageList(this).getPackages();
      // Packages that cannot be autolinked yet can be added manually here, for example:
      // packages.add(new MyReactNativePackage());
      return packages;
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }

    @Override
    protected boolean isNewArchEnabled() {
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }

    @Override
    protected Boolean isHermesEnabled() {
      return BuildConfig.IS_HERMES_ENABLED;
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
    // Fresco.initialize(this);
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      // If you opted-in for the New Architecture, we load the native entry point for
      // this app.
      DefaultNewArchitectureEntryPoint.load();
    }
    ReactNativeFlipper.initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }
  // @Override
  // public void setPermissionListener(PermissionListener permissionListener) {
  // this.permissionListener = permissionListener;
  // }

  // @Override
  // public void onRequestPermissionsResult(int requestCode, String[] permissions,
  // int[] grantResults) {
  // if (permissionListener != null) {
  // permissionListener.onRequestPermissionsResult(requestCode, permissions,
  // grantResults);
  // }
  // }
}
