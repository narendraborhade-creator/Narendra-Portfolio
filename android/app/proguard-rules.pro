# Proguard rules for Narendra Borhade Portfolio App
# Jetpack Compose & Kotlin reflection preservation

-keepattributes *Annotation*
-keepattributes Signature
-keepattributes InnerClasses
-keepattributes EnclosingMethod

# Keep Compose Runtime
-keep class androidx.compose.runtime.** { *; }
-keep class dev.narendraborhade.portfolio.** { *; }

# Keep data classes and models
-keepclassmembers class * {
    @androidx.compose.runtime.Composable *;
    void set*(***);
    *** get*();
}
