---
title: 'BroncoCTF: AO-SINT'
description: 'An evidence-first OSINT writeup using topography, architecture, map geometry, and sightlines to identify four Arcane Odyssey locations from four screenshots.'
event: 'BroncoCTF 2026'
category: 'osint'
difficulty: 'hard'
date: 2026-07-11
tags:
  - geolocation
  - roblox
  - arcane-odyssey
  - map-analysis
  - sightline-analysis
draft: false
---

<!-- The final flag is hidden behind a details toggle. Difficulty is my own qualitative rating, not an official BroncoCTF classification. -->

## Challenge overview

**Challenge author:** `blunderous_wonders` · **Game:** Roblox Arcane Odyssey

Team idktheflag placed 8th of 753 teams at BroncoCTF 2026.

AO-SINT provided four screenshots from the Roblox game *Arcane Odyssey*: two from the Bronze Sea and two from the Nimbus Sea.

The objective was to identify the island where the player character was **actually standing** in each screenshot.

The required flag format was:

```text
bronco{location1_location2_location3_location4}
```

The challenge included an important hint:

> The challenge is talking about the place where the character is, not what they are looking at. This may be the same place in some cases.

That distinction defined the entire solve. Several screenshots prominently displayed distant islands, unusual weather, or visual glitches. Those details were often distractions rather than reliable evidence of the character's location.

## Final result

The four locations, in screenshot order, were:

- Ierochos
- Port Mistral
- Makrinaos
- Ravenna

<details>
<summary><strong>Spoiler: show the final flag</strong></summary>
<pre><code>bronco{ierochos_portmistral_makrinaos_ravenna}</code></pre>
</details>

## Methodology

I approached each screenshot as a geolocation problem rather than a landmark-recognition problem.

For every image, I separated the evidence into two groups.

**Primary evidence**

- Terrain directly beneath the character
- Elevation
- Cliff and rock geometry
- Architecture
- Interior layout
- Vegetation
- Nearby landmasses
- Landmark order
- Relative landmark size
- Map direction
- In-game viewpoint reproduction

**Supporting evidence** was everything else: weather, lighting, story clues, visual effects, physics behavior, and distant landmarks. Supporting evidence could strengthen a theory, but it was never reliable enough to establish a location by itself.

## Location 1: Ierochos

### Initial observations

The first screenshot was the hardest to identify.

The player stood at a high elevation on a narrow rocky pillar. Several islands were visible in the distance, including a large frozen landmass that appeared to be Frostmill Island.

The most visually prominent island was not necessarily the answer. The challenge asked where the player was standing, not what the player was viewing.

![Arcane Odyssey character standing on a high narrow rock pillar with several distant islands visible through severe weather.](/images/ctf/broncoctf-2026-ao-sint/location-1-ierochos.webp)

*The foreground pillar and multi-island sightline supported Ierochos.*

### Initial candidates

Several Bronze Sea locations appeared plausible:

- Dawn Island
- Darkpine Isle
- Goso Jungle
- Thorin's Refuge
- Redwake
- The Northern Jaws
- The Southern Jaws

Heavy rain initially suggested Dawn Island because Dawn Island is associated with a permanent thunderstorm. That theory was weak because severe weather can occur in other parts of the game.

The distant frozen landmass also drew attention toward Frostmill Island. This was another example of the challenge's central trap: identifying the viewed landmark instead of the camera position.

### Topographic analysis

The strongest evidence came from the terrain and sightline:

- The character stood at a very high elevation.
- The surface beneath the character was a narrow, steep rock formation.
- Multiple islands appeared along the same general sightline.
- The distant frozen landmass matched Frostmill Island.
- Cedar Arch, Elm Island, and Dawn Island were also visible.
- The order and apparent sizes of the islands could be compared against the Bronze Sea map.

I treated the visible islands as reference points and worked backward to find a location from which the alignment made sense.

The approximate sightline was:

```text
Ierochos → Cedar Arch → Elm Island → Dawn Island → Frostmill Island
```

![Bronze Sea map used to compare Ierochos with Cedar Arch, Elm Island, Dawn Island, and Frostmill Island.](/images/ctf/broncoctf-2026-ao-sint/bronze-sea-map.webp)

*Landmark order and relative distance helped reconstruct the Bronze Sea sightline.*

### Verification

I later reproduced the viewpoint in-game and compared the elevation, foreground pillar, landmark order, and relative size of the visible islands. The reconstructed view was consistent with Ierochos. The verification screenshot is omitted to avoid publishing account-identifying information.

The challenge was designed to be solvable without downloading Roblox. In-game reproduction was an optional confirmation step after the screenshot and map analysis.

**Answer:** `ierochos`

**Key takeaway:** the frozen island dominated the screenshot, but Frostmill Island was only a distant reference point. The topography beneath the character and the multi-island sightline identified Ierochos as the standing location.

## Location 2: Port Mistral

### Initial observations

The second screenshot showed a developed merchant settlement: timber-framed buildings with light plaster walls and red-brown roofs on stone foundations, barrels and cargo crates, market equipment and seafood displays, waterfront infrastructure, and tall vegetated stone formations behind the town.

![Port Mistral waterfront with timber-framed buildings, cargo, market structures, and red-brown roofs.](/images/ctf/broncoctf-2026-ao-sint/location-2-port-mistral.webp)

*Port Mistral's merchant architecture and waterfront layout distinguished it from Redwake.*

### False lead: Redwake

The architecture initially resembled Redwake, an early-game settlement in the Bronze Sea.

However, this screenshot belonged to the Nimbus Sea set. That made Redwake an architectural comparison rather than a valid final answer.

### Architectural identification

The strongest Nimbus Sea match was Port Mistral.

The settlement's dense harbor layout, merchant structures, docks, cargo, cranes, and red-roofed buildings closely matched the screenshot.

The intact appearance was also consistent with visiting Port Mistral before the storyline events that alter the settlement.

![Nimbus Sea map with Port Mistral in the southwest and Makrinaos in the southeast.](/images/ctf/broncoctf-2026-ao-sint/nimbus-sea-map.webp)

*The Nimbus Sea map located Port Mistral and Makrinaos, confirming both screenshots belonged to the Nimbus Sea.*

**Answer:** `portmistral`

**Key takeaway:** architectural style alone created ambiguity because multiple settlements shared similar design elements. Identifying the correct sea narrowed the candidate set and made Port Mistral the best match.

## Location 3: Makrinaos

### Initial observations

The third screenshot showed the interior of an Assassin Syndicate facility.

Visible details included:

- A red Assassin Syndicate banner
- A contract or bounty board
- Dark stone walls
- Wooden interior construction
- Weapons and supplies
- A reception-like area
- A facility constructed inside mountainous terrain

![Interior of the Dead Halls at Makrinaos with Assassin Syndicate signage, dark stone walls, and wooden construction.](/images/ctf/broncoctf-2026-ao-sint/location-3-makrinaos.webp)

*The Nimbus Sea context and Assassin Syndicate interior supported Makrinaos.*

### Whitesummit versus Makrinaos

The Assassin Syndicate operates bases in both major seas:

- Whitesummit: Bronze Sea
- Makrinaos: Nimbus Sea

The room resembled the Red Corner inside Whitesummit, making Whitesummit a strong initial candidate.

However, the screenshot belonged to the Nimbus Sea set. This shifted the investigation toward Makrinaos.

### Supporting clues

Makrinaos contains the Dead Halls, the Assassin Syndicate's Nimbus Sea base. The island is mountainous, and much of the facility is concealed inside the terrain.

The challenge also referenced a miniboss hidden inside somewhere. That clue appeared to match Architect Kalliste, a miniboss associated with the Dead Halls.

The challenge's references to tornadoes and severe weather provided additional evidence. Makrinaos is surrounded by the Veiling Storms, an area associated with hazardous weather and rough seas.

Taken together, the Nimbus Sea context, the Assassin Syndicate interior, the mountain-based facility, the Dead Halls, the hidden-miniboss clue, and the severe-weather association all pointed the same way.

**Answer:** `makrinaos`

**Key takeaway:** the room's appearance alone could have indicated Whitesummit. The sea classification and miniboss clue were necessary to distinguish the two Assassin Syndicate facilities.

## Location 4: Ravenna

### Initial observations

The fourth screenshot contained several unusual visual elements:

- Strong red lighting
- Reduced visibility
- Distant structures and terrain
- A whale apparently flying through the air

![Ravenna terrain and distant structures under red lighting, with an airborne whale visible as an unreliable physics clue.](/images/ctf/broncoctf-2026-ao-sint/location-4-ravenna.webp)

*The airborne whale was treated as a low-confidence physics glitch rather than geographic evidence.*

### False lead: Akursius Keep

The flying whale initially suggested a hallucination or visual disturbance associated with Akursius Keep.

Akursius Keep is connected to Insanity effects, which made the interpretation initially plausible. The theory was ultimately unreliable.

### The flying-whale trap

Flying whales can occur as a physics glitch in Arcane Odyssey. Similar incidents can appear in unrelated locations, so the whale provided little dependable geographic evidence.

The red lighting was also weak evidence because lighting and weather effects are not necessarily unique to one island.

I therefore ignored the whale and focused on the terrain beneath the character, the nearby structures, the general landform, and the settlement geometry around the character's position.

The underlying environment appeared to match Ravenna, the major Bronze Sea island associated with the Ravenna Realm.

**Answer:** `ravenna`

**Key takeaway:** the whale was memorable but geographically useless. The correct answer came from the terrain and structures around the character, not the physics glitch.

## Assembling the flag

The four confirmed locations were `ierochos`, `portmistral`, `makrinaos`, and `ravenna`.

The challenge required lowercase letters, underscores between locations, and no spaces within multiword names. The assembled flag is behind the spoiler under [Final result](#final-result) above.

## Failed approaches

**Naming the most prominent landmark.** The largest nearby object often drew attention away from the actual camera position. The clearest example was Location 1: Frostmill Island dominated the background, but the player stood on Ierochos.

**Treating weather as unique evidence.** Weather produced several misleading theories: heavy rain suggested Dawn Island, tornadoes supported Makrinaos, and red haze suggested Akursius Keep. Weather was occasionally useful as supporting evidence, but it was not distinctive enough to establish a location independently.

**Overinterpreting physics glitches.** The flying whale looked intentionally significant because the challenge description called attention to it. In practice, the whale was a noisy clue. Physics glitches can occur in multiple locations and should not outweigh terrain or map evidence.

**Changing multiple uncertain flag components.** Another inefficient approach was submitting full flags while changing several uncertain components at once. This made it difficult to learn which changes were correct.

A better process would have been:

1. Assign each screenshot a confidence level.
2. Lock locations supported by strong evidence.
3. Clearly mark uncertain positions.
4. Change one uncertain component at a time.
5. Record every rejected combination.
6. Use in-game verification only when map and reference evidence remain ambiguous.

## Lessons learned

**1. Identify the camera position, not the landmark.** The most important question was: what terrain is directly beneath the character, and from which location would the visible landmarks align in this order? This was more useful than asking which island looked most recognizable.

**2. Topography is more reliable than weather.** The strongest geographic indicators were elevation, cliff shape, rock geometry, island height, vegetation, architecture, nearby landmasses, sightline direction, and relative landmark sizes. Weather and lighting were best treated as secondary evidence.

**3. Physics glitches are usually noise.** Unusual game behavior can be memorable without being useful. A clue should not receive additional weight merely because it looks strange.

**4. Separate verified components from guesses.** Each location should be assigned a confidence level, such as confirmed, strong candidate, weak candidate, or unknown. This prevents a partially correct flag from turning into uncontrolled brute force.

**5. Reconstruct sightlines for ambiguous screenshots.** Location 1 became solvable only after combining camera elevation, foreground terrain, landmark identity, landmark order, map direction, relative distance, apparent size, and in-game reproduction.

The general process can be expressed as:

```text
Standing terrain → Elevation → Visible landmarks → Landmark order
    → Map direction → Distance and apparent size
    → In-game verification → Final location
```

## Defensive and analytical takeaway

Although AO-SINT was a game-based geolocation challenge, the underlying process resembles broader intelligence analysis:

- Separate observation from interpretation.
- Rank evidence by reliability.
- Avoid anchoring on the most visually prominent clue.
- Track confidence explicitly.
- Test one uncertain assumption at a time.
- Reproduce observations when possible.
- Preserve failed hypotheses because they explain why the final conclusion is stronger.

This same discipline applies to Open Source Intelligence investigations, incident analysis, and technical troubleshooting.

## Conclusion

AO-SINT was not primarily a landmark-recognition challenge. It was an evidence-ranking and viewpoint-reconstruction challenge.

The most difficult step was identifying Ierochos from its topography and sightline toward Cedar Arch, Elm Island, Dawn Island, and Frostmill Island. Once the analysis focused on the character's actual standing position, the challenge hint became much clearer.

The final flag is behind the spoiler under [Final result](#final-result) at the top of this writeup.
