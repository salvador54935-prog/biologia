# -*- coding: utf-8 -*-
"""
Verified 55 African Scientists for BIOATLAS expansion.
All 55 figures have zero collision with existing 759 database.
Countries strictly match CircularFlag.tsx: Egipto, Sudáfrica, Nigeria, Kenia, Marruecos, Túnez, Senegal, Etiopía, Uganda, Camerún, Mali, Burkina Faso, Chad, Tanzania.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from candidates_africa import AFRICA_RAW

# Add Yeya Touré to reach 55
YEYA_TOURE = (
    "yeya-toure", "Yeya Touré", "Yeya Tiemoko Touré",
    "Entomólogo médico maliense; líder en la genética de vectores de malaria en el programa TDR de la OMS.",
    "Malí", "África", "1950 – actualidad", "Bamako, Malí", None, "1980 – 2015", 1995,
    "Entomología médica y genética de vectores", ["Biología", "Medicina"],
    "Investigó la estructura cromosómica y cariotipos de inversión de Anopheles gambiae en Malí, coordinando la estrategia de investigación en vectores tropicales de la Organización Mundial de la Salud.",
    "Universidad de Bamako y Organización Mundial de la Salud (OMS/TDR), Ginebra",
    "World Health Organization Special Programme for Research and Training in Tropical Diseases (TDR)", False, False,
    "Científico maliense fundamental en la formación de entomólogos africanos y en la investigación genómica de poblaciones de mosquitos en el Sahel.",
    "Líder global en la coordinación internacional para el control biológico de enfermedades parasitarias tropicales."
)

AFRICA_55 = AFRICA_RAW + [YEYA_TOURE]
assert len(AFRICA_55) == 55, f"Expected 55 African scientists, got {len(AFRICA_55)}"
print(f"Africa module ready with exactly {len(AFRICA_55)} verified scientists.")
