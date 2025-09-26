import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  lang: 'en-US',
  title: 'Socket.IO Report',
  description: 'Performance benchmark and realtime processor notes',
  // Set base for GitHub Pages: https://<user>.github.io/<repo>/
  // Change to your repo name if different
  base: '/socket-io-report/',
  cleanUrls: 'with-subfolders',
  lastUpdated: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Local', link: '/local/' },
      { text: 'Realtime', link: '/realtime-processer/' }
    ],
    sidebar: [
      {
        text: 'Local Benchmarks',
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'Overview', link: '/local/' },
          { text: 'System Environment', link: '/local/#system-environment' },
          { text: 'Test Architecture', link: '/local/#test-architecture' },
          { text: '5k Results', link: '/local/#performance-results-5-000-connections' },
          { text: '10k Results', link: '/local/#performance-results-10-000-connections' },
          { text: '20k Results', link: '/local/#performance-results-20-000-connections' },
          { text: '32k Results', link: '/local/#performance-results-32-000-connections' }
        ]
      },
      {
        text: 'Realtime Processor',
        collapsible: true,
        collapsed: true,
        items: [
          { text: 'Overview', link: '/realtime-processer/' },
          { text: 'Architecture', link: '/realtime-processer/#architecture' },
          { text: 'Metrics', link: '/realtime-processer/#metrics-collected' },
          { text: 'Test Cases', link: '/realtime-processer/#test-cases' },
          { text: 'Pod Overview', link: '/realtime-processer/#pod-overview' },
          { text: 'Resource Config', link: '/realtime-processer/#resource-config' },
          { text: 'Actual Usage', link: '/realtime-processer/#actual-usage' },
          { text: 'Runtime Notes', link: '/realtime-processer/#runtime-notes' },
          { text: 'Ulimits', link: '/realtime-processer/#ulimits' },
          { text: 'Perf 1k', link: '/realtime-processer/#perf-1k' },
          { text: 'Perf 5k', link: '/realtime-processer/#perf-5k' },
          { text: 'Perf 9k', link: '/realtime-processer/#perf-9-000-connections' },
          { text: 'Perf ~10k', link: '/realtime-processer/#performance-results-10-000-connections-capped-at-9-990' },
          { text: 'Screenshots', link: '/realtime-processer/#screenshots' }
        ]
      }
    ],
    outline: [2,3],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/' }
    ]
  }
}))
