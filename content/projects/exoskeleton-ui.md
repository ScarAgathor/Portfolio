---
title: "Exoskeleton Controller: Operator Interface"
summary: "Operator GUI and communication link for a lower-limb exoskeleton controller, streaming live telemetry from an STM32 over UART and BLE."
date: "Fall 2026 – Spring 2027"
sortDate: "2026-10-31"
status: "In progress"
role: "UI Engineer · Senior capstone"
tags: ["STM32", "ESP32-C3", "UART", "Zephyr", "PySide6", "Qt", "Python", "ESP-IDF"]
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
is building a new controller for it using a custom PCB that runs the motors and
reports what the system is doing.

A controller like this is only usable if the person running a session can see
its state continuously and stop it instantly. Is the battery healthy? Are the
sensors reading sensibly? Has a joint thrown an error? Without a clear operator
view, problems show up as a device that "just stopped working."

Currently researchers in the lab judge the physical state exoskeleton by eye without being able to see detailed acocunts of errors, motor speed and angle.

## My role

I'm the UI engineer on a four-person team, and I own everything between the
controller and the operator:

- **The communication protocol.** I'm writing the comm module on the STM32
  side, a framed packet protocol over UART with a checksum, and a defined
  interface where it hands off to my teammates' control code.
- **The wireless communication.** I am writing the wireless communication link between 
  the GUI and the STM32 that lives on an ESP32-C3 using Bluetooth Low Energy.
- **The operator GUI.** A desktop application that shows real-time power,
  sensor, and joint data, error flags, and diagnostic results, and logs every
  session.

Teammates own the control loop and CAN motor control, the PCB design, and power
delivery. 

I also contributed to developing our Verification and Validation Test Plan, decsion matrix and overall design package.

## Tech

The controller board uses two microcontrollers with separate jobs:

- **STM32G474 running Zephyr RTOS** handles real-time motor control over CAN
  using three sensors.
- **ESP32-C3** acts as a Bluetooth Low Energy bridge. It receives packets from
  the STM32 over UART and forwards them to the laptop.

The design started as a single STM32WB55 handling both control and Bluetooth.
We decided it would be easier to have the STM32 dedicate more processing power to 
ensuring the control loop executes timely. Th ESP32 was already poised to be in a good position to handling wirless communication, so we then settled on STM32G474 and the ESP32-C3

Data flows both ways. Telemetry goes up from the STM32 to the GUI, and the GUI
sends back only three commands: start, stop, and emergency stop. Emergency stop
sends an immediate kill rather than the normal step-by-step safe shutdown, so
the operator always has a fast way out.

The GUI is written in **Python with PySide6** and runs on a Windows laptop.
Session logging runs continuously on the GUI side.

## Photos

![System Block Diagram](/images/projects/exoskeleton-ui/block-diagram.png)
*Highlevel Block diagram of the communication system.*

![Operator GUI sketch](/images/projects/exoskeleton-ui/gui-sketch.png)
*Early Figma sketch of the operator dashboard.*



## Status and next steps

This is a two-semester senior capstone, currently in the design phase. So far:

- Finalized the two-MCU architecture with the team
- Sketched the operator GUI layout in Figma
- Finalizng the packet format

Next:

- Get BLE working on the ESP32-C3
- Stream live telemetry from the STM32 to the GUI
- Add the start, stop, and emergency stop commands back to the STM32
- Validate the full system against our verification and validation test plan

I'll update this page as the build progresses.