---
title: "Exoskeleton Controller: Operator Interface"
summary: "Operator GUI and communication link for a lower-limb exoskeleton controller, streaming live telemetry from an STM32 over UART and BLE."
date: "Fall 2026 – Spring 2027"
sortDate: "2026-10-31"
status: "In progress"
role: "UI Engineer · Senior capstone"
tags: ["PySide6", "BLE", "UART", "STM32", "ESP32-C3", "Zephyr", "Python", "CAN"]
cover: "/images/projects/exoskeleton-ui/cover.webp"
featured: true
links: []
# links:
#   - label: "GitHub"
#     href: "https://github.com/ScarAgathor/TODO"
---

## Problem

Researchers at UTSA's Intelligent Systems and Bionics Engineering Lab (ISABEL)
use a lower-limb exoskeleton based on the OpenExo design, which assists the hip
and ankle during level-ground walking. Our senior capstone team, ISABEL ECExo,
is building a new controller for it: a custom PCB that runs the motors and
reports what the system is doing.

A controller like this is only usable if the person running a session can see
its state at a glance and stop it instantly. Is the battery healthy? Are the
sensors reading sensibly? Has a joint thrown an error? Without a clear operator
view, problems show up as a device that "just stopped working."
`TODO: one sentence on what operators currently use, if anything.`

## My role

I'm the UI engineer on a four-person team, and I own everything between the
controller and the operator:

- **The communication protocol.** I'm writing the comm module on the STM32
  side, a framed packet protocol over UART with a checksum, and a defined
  interface where it hands off to my teammates' control code.
- **The operator GUI.** A desktop application that shows real-time power,
  sensor, and joint data, error flags, and diagnostic results, and logs every
  session.

Teammates own the control loop and CAN motor control, the PCB design, and power
delivery. `TODO: add anything else you contributed, like the V&V test plan.`

## Tech

The controller board uses two microcontrollers with separate jobs:

- **STM32G474 running Zephyr RTOS** handles real-time motor control over CAN
  using three sensors.
- **ESP32-C3** acts as a Bluetooth Low Energy bridge. It receives packets from
  the STM32 over UART and forwards them to the laptop.
- **24 V battery** powers the controller, sensors, and motors.

The design started as a single STM32WB55 handling both control and Bluetooth.
`TODO: one sentence on why the team moved to two MCUs.`

Data flows both ways. Telemetry goes up from the STM32 to the GUI, and the GUI
sends back only three commands: start, stop, and emergency stop. Emergency stop
sends an immediate kill rather than the normal step-by-step safe shutdown, so
the operator always has a fast way out.

The GUI is written in **Python with PySide6** and runs on a Windows laptop.
Session logging runs continuously on the GUI side.

`TODO: add a block diagram: Sensors → STM32G474 (Zephyr) → CAN → Motors, and
STM32G474 → UART → ESP32-C3 → BLE → PySide6 GUI.`

<!-- ![System block diagram](/images/projects/exoskeleton-ui/block-diagram.webp) -->

## Photos

`TODO: add 2–4 images, such as the block diagram, your Figma GUI sketch, a PCB
render, or the exoskeleton itself.`

<!--
![Operator GUI sketch](/images/projects/exoskeleton-ui/gui-sketch.webp)
*Early Figma sketch of the operator dashboard.*

![Controller PCB](/images/projects/exoskeleton-ui/pcb.webp)
*Custom controller board with the STM32G474 and ESP32-C3.*
-->

## Status and next steps

This is a two-semester senior capstone, currently in the design phase. So far:

- Finalized the two-MCU architecture with the team
- Sketched the operator GUI layout in Figma
- `TODO: anything else that's done, like the packet format or BLE testing`

Next:

- Get BLE working on the ESP32-C3
- Stream live telemetry from the STM32 to the GUI
- Add the start, stop, and emergency stop commands back to the STM32
- Validate the full system against our verification and validation test plan

I'll update this page as the build progresses.