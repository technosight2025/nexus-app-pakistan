"use client"

import React, { useState, useEffect } from 'react'
import { Joyride, STATUS } from 'react-joyride'

const JoyrideComponent = Joyride as any;

export default function VenueDashboardTutorial() {
  const [run, setRun] = useState(false)

  useEffect(() => {
    // Only run on the client, and only if they haven't seen it yet
    const hasSeenTutorial = localStorage.getItem("nexus_venue_tutorial_completed")
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
      title: 'Welcome to your Venue Empire! 🏛️',
      content: 'Your banquet dashboard is ready. Let us give you a quick tour to help you manage your halls, leads, and events seamlessly.',
      disableBeacon: true,
    },
    {
      target: '#tour-venue-topbar',
      placement: 'bottom',
      title: 'Command Center',
      content: 'Access Global Search, Quick Actions, and your AI Assistant right from the top bar.',
      disableBeacon: true,
    },
    {
      target: '#tour-venue-kpi',
      placement: 'bottom',
      title: 'Key Metrics',
      content: 'Track your total revenue, active leads, conversion rates, and upcoming events at a single glance.',
      disableBeacon: true,
    },
    {
      target: '#tour-venue-activity',
      placement: 'left',
      title: 'Live Activity Feed',
      content: 'Watch as new leads roll in, payments are confirmed, and site visits are booked in real-time.',
      disableBeacon: true,
    }
  ]

  const handleJoyrideCallback = (data: any) => {
    const { status } = data
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED]

    if (finishedStatuses.includes(status)) {
      setRun(false)
      // Mark as completed so it never shows again
      localStorage.setItem("nexus_venue_tutorial_completed", "true")
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
