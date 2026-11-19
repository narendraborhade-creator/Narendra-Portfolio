package dev.narendraborhade.portfolio.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import dev.narendraborhade.portfolio.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HudPortfolioScreen() {
    var selectedTab by remember { mutableStateOf(0) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "NARENDRA BORHADE",
                            fontSize = 15.sp,
                            fontWeight = FontWeight.Bold,
                            fontFamily = FontFamily.Monospace,
                            color = Color.White
                        )
                        Text(
                            text = "SOC ANALYST // HUD DOSSIER",
                            fontSize = 10.sp,
                            fontFamily = FontFamily.Monospace,
                            color = CyberCyan
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = CyberDark
                ),
                actions = {
                    IconButton(onClick = {}) {
                        Icon(
                            imageVector = Icons.Default.Shield,
                            contentDescription = "Threat Status",
                            tint = CyberGreen
                        )
                    }
                }
            )
        },
        bottomBar = {
            NavigationBar(
                containerColor = CyberSurface,
                tonalElevation = 8.dp
            ) {
                listOf(
                    Triple(0, "Dossier", Icons.Default.Person),
                    Triple(1, "Projects", Icons.Default.Code),
                    Triple(2, "SIEM BOTS", Icons.Default.Security),
                    Triple(3, "Comms", Icons.Default.Email)
                ).forEach { (index, label, icon) ->
                    NavigationBarItem(
                        selected = selectedTab == index,
                        onClick = { selectedTab = index },
                        icon = { Icon(icon, contentDescription = label) },
                        label = { Text(label, fontSize = 10.sp, fontFamily = FontFamily.Monospace) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = Color.Black,
                            selectedTextColor = CyberCyan,
                            indicatorColor = CyberCyan,
                            unselectedIconColor = Color.Gray,
                            unselectedTextColor = Color.Gray
                        )
                    )
                }
            }
        },
        containerColor = CyberDark
    ) { paddingValues ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            item {
                // Tactical ID Card
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(CyberSurface, RoundedCornerShape(12.dp))
                        .border(1.dp, CyberCyan.copy(alpha = 0.4f), RoundedCornerShape(12.dp))
                        .padding(16.dp)
                ) {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.SpaceBetween,
                            verticalAlignment = Alignment.CenterVertically
                        ) {
                            Text(
                                text = "CALLSIGN: CREATOR-NAREN",
                                fontSize = 11.sp,
                                fontFamily = FontFamily.Monospace,
                                color = CyberCyan,
                                fontWeight = FontWeight.Bold
                            )
                            Text(
                                text = "MCA: 7.8 CGPA",
                                fontSize = 11.sp,
                                fontFamily = FontFamily.Monospace,
                                color = CyberGreen
                            )
                        }

                        Text(
                            text = "SOC Analyst & Cybersecurity Specialist | VAPT & AppSec",
                            fontSize = 14.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )

                        Text(
                            text = "Analyzed 360,000+ Boss of the SOC (BOTS) events in Splunk with custom SPL queries. Creator of Aegis 3D Safe Browser (aegisscans.dev) and completed OffSec Stapler root exploitation.",
                            fontSize = 12.sp,
                            fontFamily = FontFamily.Monospace,
                            color = Color.LightGray,
                            lineHeight = 16.sp
                        )
                    }
                }
            }

            item {
                // Key Telemetry Row
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(8.dp)
                ) {
                    listOf(
                        "360k+ BOTS" to "Splunk SIEM",
                        "OffSec Stapler" to "Root Pwned",
                        "Aegis Browser" to "SSRF Guard",
                        "Pune, IN" to "Location"
                    ).forEach { (title, subtitle) ->
                        Box(
                            modifier = Modifier
                                .weight(1f)
                                .background(CyberSurface, RoundedCornerShape(8.dp))
                                .border(1.dp, Color.DarkGray, RoundedCornerShape(8.dp))
                                .padding(8.dp)
                        ) {
                            Column {
                                Text(title, fontSize = 11.sp, fontWeight = FontWeight.Bold, color = Color.White)
                                Text(subtitle, fontSize = 9.sp, color = CyberCyan)
                            }
                        }
                    }
                }
            }

            item {
                // Featured Project Spotlight
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(CyberSurface, RoundedCornerShape(12.dp))
                        .border(1.dp, CyberCyan, RoundedCornerShape(12.dp))
                        .padding(16.dp)
                ) {
                    Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                        Text(
                            text = "LIVE ASSET: AEGIS 3D SAFE BROWSER",
                            fontSize = 11.sp,
                            fontWeight = FontWeight.Bold,
                            color = CyberCyan
                        )
                        Text(
                            text = "SSRF Sandboxed 3D Browser with Google Gemini 2.5 Copilot",
                            fontSize = 13.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.White
                        )
                        Text(
                            text = "Real-time DNS scanning, HTTP security header inspection (HSTS, CSP), and hybrid FastAPI backend. Production deployment at aegisscans.dev.",
                            fontSize = 12.sp,
                            fontFamily = FontFamily.Monospace,
                            color = Color.LightGray
                        )
                    }
                }
            }
        }
    }
}

@Preview(showBackground = true, backgroundColor = 0xFF030712)
@Composable
fun HudPortfolioScreenPreview() {
    NarendraPortfolioTheme {
        HudPortfolioScreen()
    }
}
