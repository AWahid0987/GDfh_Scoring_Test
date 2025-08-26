odoo.define('gdfh_scoring_test.result_chart', function (require) {
  'use strict';

  const publicWidget = require('web.public.widget');
  const ajax = require('web.ajax');

  publicWidget.registry.ResultChart = publicWidget.Widget.extend({
    selector: '.gdfh-result-graph',
    start: async function () {
      const email = this.$el.data('email');
      if (!email) return;

      try {
        const response = await ajax.jsonRpc('/GDfH_Scoring_Test/fetch_result_by_email', 'call', { email });
        const r = response.result;

        if (r) {
          const ctx = this.$el.find('canvas')[0].getContext('2d');
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: [
                'Global Awareness',
                'Civic Participation',
                'Environment',
                'Ethics',
                'Peace',
                'Intercultural'
              ],
              datasets: [{
                label: 'Percentage',
                data: [
                  r.global_awareness_pct,
                  r.civic_participation_pct,
                  r.environment_pct,
                  r.ethical_pct,
                  r.peace_pct,
                  r.intercultural_pct
                ],
                backgroundColor: '#3498db'
              }]
            },
            options: {
              responsive: true,
              scales: {
                y: { beginAtZero: true, max: 100 }
              }
            }
          });
        }
      } catch (err) {
        console.error('Error loading chart data:', err);
      }
    },
  });
});
