import { useState } from 'react'

import Layout from '../components/Layout'

import { generateAIReport }
  from '../lib/reportGenerator'

import { exportReportPDF }
  from '../lib/exportPdf'

import { supabase }
  from '../lib/supabase'

import { ClipLoader }
  from 'react-spinners'

export default function Reports() {
  const [loading, setLoading] =
    useState(false)

  const [report, setReport] =
    useState('')

  const generateReport = async () => {
    setLoading(true)

    const { data, error } =
      await supabase
        .from('metrics')
        .select('*')

    if (error) {
      console.error(error)
      setLoading(false)
      return
    }

    const response =
      await generateAIReport(data)

    setReport(response)

    setLoading(false)
  }

  return (
    <Layout
      title="AI Executive Reports"
      subtitle="Enterprise-grade AI business intelligence generation."
    >
      <div className="glass neon rounded-3xl p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={generateReport}
            className="px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-blue-500 font-semibold"
          >
            Generate Executive Report
          </button>

          {loading && (
            <ClipLoader
              color="#8B5CF6"
              size={24}
            />
          )}
        </div>

        {report && (
          <>
            <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6 whitespace-pre-wrap leading-8">
              {report}
            </div>

            <button
              onClick={() =>
                exportReportPDF(report)
              }
              className="mt-6 px-6 py-3 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/20 transition"
            >
              Export PDF
            </button>
          </>
        )}
      </div>
    </Layout>
  )
}