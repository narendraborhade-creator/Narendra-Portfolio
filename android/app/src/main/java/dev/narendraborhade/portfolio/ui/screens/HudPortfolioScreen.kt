package dev.narendraborhade.portfolio.ui.screens

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
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

data class ProjectItem(val code: String, val title: String, val desc: String, val stack: String)
data class SiemQueryItem(val title: String, val tactic: String, val query: String)

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun HudPortfolioScreen() {
    var selectedTab by remember { mutableStateOf(0) }

    // Hoisted static allocations to eliminate recomposition garbage
    val navItems = remember {
        listOf(
            Triple(0, "Dossier", Icons.Default.Person),
            Triple(1, "Projects", Icons.Default.Code),
            Triple(2, "SIEM BOTS", Icons.Default.Security),
            Triple(3, "Comms", Icons.Default.Email)
        )
    }

    val telemetryChips = remember {
        listOf(
            "360k+ BOTS" to "Splunk SIEM",
            "OffSec Stapler" to "Root Pwned",
            "Aegis Browser" to "SSRF Guard",
            "Pune, IN" to "Location"
        )
    }

    val projects = remember {
        listOf(
            ProjectItem("PRJ-AEGIS-01", "Aegis 3D Safe Browser", "SSRF-hardened 3D browser with Gemini 2.5 Flash AI Copilot & real-time DNS inspection.", "TypeScript, React, Three.js, FastAPI"),
            ProjectItem("PRJ-SPLUNK-02", "Splunk BOTS v1 SIEM Lab", "Ingested 360,000+ web events into Splunk Enterprise; built SPL threat hunting rules.", "Splunk, SPL, Wireshark, Snort"),
            ProjectItem("LAB-OFFSEC-03", "OffSec Proving Grounds: Stapler", "Full penetration test chaining WordPress LFI -> MySQL INTO OUTFILE RCE -> Root PrivEsc.", "Nmap, smbclient, MySQL, Linux"),
            ProjectItem("PRJ-MANGA-04", "Manga.for-me Privacy Reader", "Concurrent 6-source content aggregator with anti-tracking image proxy and Edge caching.", "React, Node.js, Vercel Edge")
        )
    }

    val siemQueries = remember {
        listOf(
            SiemQueryItem("Acunetix Scanner Recon", "Reconnaissance (TA0043)", "index=botsv1 sourcetype=stream:http http_user_agent=\"*acunetix*\" | stats count by src_ip"),
            SiemQueryItem("Blind SQLi Correlation", "Initial Access (TA0001)", "index=botsv1 sourcetype=stream:http uri_query=\"*UNION*SELECT*\" | eval is_sqli=\"YES\""),
            SiemQueryItem("Reflected XSS Injection", "Execution (TA0002)", "index=botsv1 sourcetype=access_combined uri=\"*<script*\" | stats count by clientip")
        )
    }

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
                navItems.forEach { (index, label, icon) ->
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
            when (selectedTab) {
                // Tab 0: Candidate Dossier Overview
                0 -> {
                    item {
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
                        Row(
                            modifier = Modifier.fillMaxWidth(),
                            horizontalArrangement = Arrangement.spacedBy(8.dp)
                        ) {
                            telemetryChips.forEach { (title, subtitle) ->
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
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(CyberSurface, RoundedCornerShape(12.dp))
                                .border(1.dp, CyberCyan, RoundedCornerShape(12.dp))
                                .padding(16.dp)
                        ) {
                            Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                                Text(
                                    text = "PRODUCTION WEB DEPLOYMENT",
                                    fontSize = 11.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = CyberCyan
                                )
                                Text(
                                    text = "Aegis 3D Safe Browser (aegisscans.dev)",
                                    fontSize = 13.sp,
                                    fontWeight = FontWeight.Bold,
                                    color = Color.White
                                )
                                Text(
                                    text = "SSRF Sandboxed 3D Browser with Google Gemini 2.5 Copilot & DNS Posture Scorer.",
                                    fontSize = 12.sp,
                                    fontFamily = FontFamily.Monospace,
                                    color = Color.LightGray
                                )
                            }
                        }
                    }
                }

                // Tab 1: Projects Directory
                1 -> {
                    items(projects) { project ->
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(CyberSurface, RoundedCornerShape(12.dp))
                                .border(1.dp, Color.DarkGray, RoundedCornerShape(12.dp))
                                .padding(16.dp)
                        ) {
                            Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                                Row(
                                    modifier = Modifier.fillMaxWidth(),
                                    horizontalArrangement = Arrangement.SpaceBetween
                                ) {
                                    Text(project.code, fontSize = 10.sp, color = CyberCyan, fontFamily = FontFamily.Monospace)
                                    Text("ACTIVE", fontSize = 10.sp, color = CyberGreen, fontFamily = FontFamily.Monospace)
                                }
                                Text(project.title, fontSize = 14.sp, fontWeight = FontWeight.Bold, color = Color.White)
                                Text(project.desc, fontSize = 12.sp, fontFamily = FontFamily.Monospace, color = Color.LightGray)
                                Text("Stack: ${project.stack}", fontSize = 10.sp, color = Color.Gray, fontFamily = FontFamily.Monospace)
                            }
                        }
                    }
                }

                // Tab 2: SIEM BOTS Splunk Threat Queries
                2 -> {
                    item {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(CyberSurface, RoundedCornerShape(12.dp))
                                .border(1.dp, CyberCyan.copy(alpha = 0.5f), RoundedCornerShape(12.dp))
                                .padding(14.dp)
                        ) {
                            Column(verticalArrangement = Arrangement.spacedBy(4.dp)) {
                                Text("SPLUNK BOTS V1 LAB", fontSize = 12.sp, fontWeight = FontWeight.Bold, color = CyberCyan)
                                Text("360,000+ Ingested Events analyzed via custom SPL queries.", fontSize = 11.sp, color = Color.White, fontFamily = FontFamily.Monospace)
                            }
                        }
                    }

                    items(siemQueries) { item ->
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(CyberSurface, RoundedCornerShape(10.dp))
                                .border(1.dp, Color.DarkGray, RoundedCornerShape(10.dp))
                                .padding(14.dp)
                        ) {
                            Column(verticalArrangement = Arrangement.spacedBy(6.dp)) {
                                Text(item.title, fontSize = 13.sp, fontWeight = FontWeight.Bold, color = Color.White)
                                Text("MITRE: ${item.tactic}", fontSize = 10.sp, color = CyberCyan, fontFamily = FontFamily.Monospace)
                                Box(
                                    modifier = Modifier
                                        .fillMaxWidth()
                                        .background(Color.Black, RoundedCornerShape(6.dp))
                                        .padding(8.dp)
                                ) {
                                    Text(item.query, fontSize = 10.sp, color = CyberGreen, fontFamily = FontFamily.Monospace)
                                }
                            }
                        }
                    }
                }

                // Tab 3: Contact & Comms
                3 -> {
                    item {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .background(CyberSurface, RoundedCornerShape(12.dp))
                                .border(1.dp, CyberCyan, RoundedCornerShape(12.dp))
                                .padding(16.dp)
                        ) {
                            Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
                                Text("COMMUNICATION CHANNELS", fontSize = 13.sp, fontWeight = FontWeight.Bold, color = CyberCyan)
                                Text("Email: narendra.via.mail@gmail.com", fontSize = 12.sp, color = Color.White, fontFamily = FontFamily.Monospace)
                                Text("Phone: +91 8503041687", fontSize = 12.sp, color = Color.White, fontFamily = FontFamily.Monospace)
                                Text("Location: Pune, Maharashtra, India", fontSize = 12.sp, color = Color.LightGray, fontFamily = FontFamily.Monospace)
                                Text("GitHub: https://github.com/Creator-Naren", fontSize = 11.sp, color = CyberCyan, fontFamily = FontFamily.Monospace)
                                Text("LinkedIn: https://www.linkedin.com/in/narendra-borhade-developer", fontSize = 11.sp, color = CyberCyan, fontFamily = FontFamily.Monospace)
                            }
                        }
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
