"use client"

import React, { useState, useEffect } from 'react'
import { Joyride, STATUS } from 'react-joyride'

const JoyrideComponent = Joyride as any;

export default function DashboardTutorial() {
  const [run, setRun] = useState(false)

  useEffect(() => {
    // Only run on the client, and only if they haven't seen it yet
    const hasSeenTutorial = localStorage.getItem("nexus_tutorial_completed")
    if (!hasSeenTutorial) {
      // Small delay to let the UI finish rendering and animating
      const timer = setTimeout(() => {
        setRun(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const steps: any[] = [
    {
      target: 'body',
      placement: 'center',
      title: 'Welcome to Nexus! 🚀',
      content: 'Your rental empire is ready. Let us give you a quick 3-step tour of your new dashboard to get you started.',
      disableBeacon: true,
    },
    {
      target: '#tour-sidebar',
      placement: 'right',
      title: 'Your Command Center',
      content: 'Navigate between your Bookings, Wardrobe, Calendar, and Customer CRM from this sidebar.',
      disableBeacon: true,
    },
    {
      target: '#tour-revenue',
      placement: 'bottom',
      title: 'Live Analytics',
      content: 'Track your total revenue, active rentals, and pending payouts in real-time right here.',
      disableBeacon: true,
    },
    {
      target: '#tour-recent-activity',
      placement: 'left',
      title: 'Real-time Updates',
      content: 'Watch new bookings, payments, and AI try-on sessions roll in automatically from your customers.',
      disableBeacon: true,
    }
  ]

  const handleJoyrideCallback = (data: any) => {
    const { status } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setRun(false)
      // Mark as completed so it never shows again
      localStorage.setItem("nexus_tutorial_completed", "true")
    }
  }

  // Prevent hydration mismatch by returning null until mounted
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <JoyrideComponent
      steps={steps}
      run={run}
      continuous
      scrollToFirstStep
      showProgress
      showSkipButton
      callback={handleJoyrideCallback}
      styles={{
        options: {
          primaryColor: '#0A3B2A',
          backgroundColor: '#ffffff',
          textColor: '#1A1A1A',
          zIndex: 10000,
        },
        tooltipContainer: {
          textAlign: 'left',
        },
        tooltipTitle: {
          fontWeight: 900,
          fontSize: '18px',
          marginBottom: '8px',
          color: '#0A3B2A',
        },
        tooltipContent: {
          fontSize: '14px',
          color: '#64748b',
          fontWeight: 500,
          lineHeight: '1.5',
        },
        buttonNext: {
          backgroundColor: '#0A3B2A',
          fontWeight: 'bold',
          borderRadius: '8px',
          padding: '10px 16px',
        },
        buttonBack: {
          color: '#64748b',
          fontWeight: 'bold',
        },
        buttonSkip: {
          color: '#94a3b8',
          fontWeight: 'bold',
        }
      } as any}
    />
  )
}
