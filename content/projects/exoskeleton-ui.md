---
title: "Exoskeleton Controller: Operator Interface"
summary: "Real-time monitoring and diagnostics GUI for a lower-limb exoskeleton controller, fed over BLE from a custom STM32 + ESP32 board."
date: "Fall 2026 – Spring 2027"
sortDate: "2026-10-31"
status: "In progress"
role: "UI Engineer · Senior capstone"
tags: ["STM32", "ESP32", "Zephyr", "BLE", "CAN", "GUI", "Embedded"]
cover: "/images/projects/exoskeleton-ui/cover.webp"
featured: true
links: []
# links:
#   - label: "GitHub"
#     href: "https://github.com/TODO"
---

## Problem

Exoskeleton researchers at UTSA's Intelligent Systems and Bionics Engineering
Lab (ISABEL) use an OpenExo-based lower-limb exoskeleton that assists the hip
and ankle during level-ground walking. Our capstone team, ISABEL ECExo, is
building a new controller for it: a custom PCB that runs motor control and
reports what the system is doing.

A controller like this is only usable if the person running a session can see
its state at a glance. Is the battery healthy? Are the sensors reading
sensibly? Has a joint thrown an error? Without that, problems show up as a
device that "just stopped working." `TODO: one sentence on what operators
currently do without this, if anything.`

## My role

I'm the UI engineer on a four-person team. I own two pieces of the software:

- **The communication loop**: getting live and logged data off the board.
  An ESP32 on our PCB streams data over Bluetooth Low Energy to a laptop.
- **The operator GUI**: a laptop application that shows real-time power-system
  data, sensor readings, actuator and joint error flags, and diagnostic results.

Teammates handle the control loop and CAN motor control, PCB design, and power
delivery. `TODO: anything else you contributed, e.g. the V&V test plan or the
Zephyr setup tutorial.`

## Tech

The board uses two microcontrollers with a clear split of responsibilities:

- **STM32 running Zephyr RTOS**: real-time motor control over CAN, reading
  three sensors. Keeping timing-critical control on its own MCU means the
  wireless link can never stall it.
- **ESP32-WROOM-32**: handles BLE and forwards live and logged data to the
  laptop.
- **24 V battery** powering the controller, sensors, and motors.

The design started as a single STM32WB55 handling both control and Bluetooth.
We moved to two MCUs so that real-time control and wireless communication
don't compete for the same processor. `TODO: confirm this is the reason, or
replace it with the real one.`

For the GUI: `TODO: language and framework (e.g. Python + PyQt), how it
receives BLE data, and why you chose it over a tablet app.`

`TODO: add a block diagram: Sensors → STM32 (Zephyr) → CAN → Motors, and
STM32 → ESP32 → BLE → Laptop GUI.`

<!-- ![System block diagram](/images/projects/exoskeleton-ui/block-diagram.webp) -->

## Photos

`TODO: add 2–4 images. Even mid-project these work well: the block diagram, a
PCB render or bare board, an early GUI screenshot or wireframe, the
exoskeleton itself.`

<!--
![Early GUI wireframe](/images/projects/exoskeleton-ui/gui-wireframe.webp)
*Early wireframe of the operator dashboard.*

![Controller PCB](/images/projects/exoskeleton-ui/pcb.webp)
*Custom controller board with STM32 and ESP32.*
-->

## Status and next steps

This is a two-semester senior capstone, currently in the design phase. So far:

- Finalized the two-MCU architecture with the team
- `TODO: what's done on your side (e.g. BLE link prototyped, GUI layout drafted,
  V&V test plan written)`

Next:

- `TODO: e.g. stream live sensor data to the GUI over BLE`
- `TODO: e.g. error-flag and diagnostics views`
- Validate the full system against our verification and validation test plan

I'll update this page as the build progresses.
