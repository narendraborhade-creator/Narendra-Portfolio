package dev.narendraborhade.portfolio.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val CyberCyan = Color(0xFF00F3FF)
val CyberDark = Color(0xFF030712)
val CyberSurface = Color(0xFF070F22)
val CyberGreen = Color(0xFF00FF88)
val CyberAmber = Color(0xFFFFAA00)
val CyberRed = Color(0xFFFF1744)

private val CyberColorScheme = darkColorScheme(
    primary = CyberCyan,
    onPrimary = Color.Black,
    secondary = CyberGreen,
    onSecondary = Color.Black,
    background = CyberDark,
    surface = CyberSurface,
    onBackground = Color.White,
    onSurface = Color.White
)

@Composable
fun NarendraPortfolioTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = CyberColorScheme,
        content = content
    )
}
