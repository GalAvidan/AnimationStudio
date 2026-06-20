"""
Palette definitions — mirrors the structure in spec-types.PaletteSet.
Keys match the PaletteTokens fields for consistency with other adapters.
"""

from dataclasses import dataclass


@dataclass
class PaletteTokens:
    background: str
    surface: str
    text_primary: str
    text_secondary: str
    accent: str
    accent_text: str


@dataclass
class PaletteSet:
    id: str
    label: str
    tokens: PaletteTokens
    description: str = ""


ANIMATION_PALETTES: list[PaletteSet] = [
    PaletteSet(
        id="clean-light",
        label="Clean Light",
        tokens=PaletteTokens(
            background="#f5f7fb",
            surface="#ffffff",
            text_primary="#0f172a",
            text_secondary="#475569",
            accent="#0f766e",
            accent_text="#ecfeff",
        ),
    ),
    PaletteSet(
        id="cinematic-night",
        label="Cinematic Night",
        tokens=PaletteTokens(
            background="#0b1022",
            surface="#131a34",
            text_primary="#f8fafc",
            text_secondary="#cbd5e1",
            accent="#f97316",
            accent_text="#fff7ed",
        ),
    ),
    PaletteSet(
        id="spring-energy",
        label="Spring Energy",
        tokens=PaletteTokens(
            background="#f0fdf4",
            surface="#dcfce7",
            text_primary="#14532d",
            text_secondary="#166534",
            accent="#a21caf",
            accent_text="#fdf4ff",
        ),
    ),
]
