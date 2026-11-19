package dev.narendraborhade.portfolio

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import dev.narendraborhade.portfolio.ui.screens.HudPortfolioScreen
import dev.narendraborhade.portfolio.ui.theme.NarendraPortfolioTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            NarendraPortfolioTheme {
                HudPortfolioScreen()
            }
        }
    }
}
