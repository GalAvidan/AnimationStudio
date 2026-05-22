# Why Does Ice Float? — General Spec

**Project:** why-ice-floats  
**Variant:** general  
**Runtime:** ~30 seconds  
**Adapter:** motion-canvas

---

## Cast

| ID       | Label   | Rig Asset          | Scenes              |
|----------|---------|--------------------|---------------------|
| curious  | Curious | assets/curious.svg | hook, solids-sink, ice-rises, payoff |

---

## Color Palette

| Token      | Hex       | Usage                        |
|------------|-----------|------------------------------|
| bg         | #0a1628   | Background                   |
| ice        | #a8d8ea   | Ice cube / ice layer         |
| iceStroke  | #6ab4cc   | Ice cube border              |
| water      | #1a6b9a   | Water body                   |
| waterDeep  | #0d4f73   | Deep water layer             |
| molecule   | #c8e8ff   | Molecule circles             |
| molBond    | #5aa0cc   | Bond lines / molecule stroke |
| glass      | #d0e8f0   | Glass outline                |
| rock       | #6b5a4e   | Sinking rock                 |
| coin       | #d4a843   | Sinking coin                 |
| text       | #ffffff   | Primary captions             |
| label      | #a8d8ea   | Secondary labels             |

---

## Beat Map

| Beat | Scene File      | Duration | Character | Emotion    | Key Visual                         |
|------|-----------------|----------|-----------|------------|------------------------------------|
| 1    | hook            | 5s       | curious   | neutral    | Ice cube drops and floats          |
| 2    | solids-sink     | 5s       | curious   | curious    | Rock + coin sink                   |
| 3    | ice-rises       | 5s       | curious   | surprised  | Ice cube floats up                 |
| 4    | molecules       | 7s       | —         | —          | Liquid → hex lattice               |
| 5    | density         | 5s       | —         | —          | Same mass, ice block bigger        |
| 6    | payoff          | 3s       | curious   | happy      | Lake cross-section, fish survive   |

**Total: 30s**

---

## Sync Points

| ID              | Time | Scene     | Offset in Scene | Description                          |
|-----------------|------|-----------|-----------------|--------------------------------------|
| lattice-form    | 18s  | molecules | 3s              | Molecules snap into hexagonal lattice|
| density-reveal  | 24s  | density   | 2s              | Ice block expands and floats up      |

---

## Character Poses (curious rig)

| Preset    | Usage             | Brows              | Eyes        | Mouth       |
|-----------|-------------------|--------------------|-------------|-------------|
| neutral   | hook              | flat (0°)          | normal      | flat line   |
| curious   | solids-sink       | inner corners up   | normal      | flat line   |
| surprised | ice-rises         | both raised high   | wide (×1.25)| open O      |
| happy     | payoff            | relaxed up         | normal      | smile       |

---

## Layout Constants

- **View:** 1920 × 1080, center (0, 0)
- **Glass center:** (0, 20), width 180, height 320
- **Water surface y:** −10
- **Ice float y:** −44 (center)
- **Character position:** (660, 330), size 200

---

## Notes

- No voiceover — text captions only.
- molecules and density scenes are character-free (full frame for visuals).
- `easeInCubic` for gravity-driven falls; `easeOutCubic` / `easeOutBack` for rises.
