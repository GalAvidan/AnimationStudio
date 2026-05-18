# Skill: Motion Language

## Purpose

Keep motion clear, pleasant, and purposeful across any rendering adapter.

## Rules

- Use quick ease-out entrances for simple elements.
- Use smoother ease-in-out transitions for conceptual transformations.
- Hold key frames long enough for comprehension.
- Avoid constant movement when the viewer needs to read.
- Make emphasis motion brief and intentional.

## Defaults

- Fast accent motion: 8 to 12 frames at 30fps.
- Major transitions: 18 to 30 frames at 30fps.
- Reading holds: at least 1.0 second unless the spec says otherwise.

## Easing Guidance

Choose easing by intent, not by library API:

- **Entrance:** quick ease-out — element decelerates into position.
- **Transformation:** smooth ease-in-out — balanced acceleration and deceleration.
- **Emphasis:** spring-like — slight overshoot that snaps back.
- **Exit:** ease-in — element accelerates out, implying energy transferred.

Adapter-specific implementations of these curves live in the adapter skill.
