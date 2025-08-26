from odoo import models, fields, api


class GdfhEmailGroup(models.Model):
    _name = 'gdfh.email.group'
    _description = 'GDfH Email Group'
    _rec_name = 'name'

    email = fields.Char(required=True, string="Email", index=True)
    name = fields.Char(string="Name", compute='_compute_name', store=True)
    result_ids = fields.One2many('gdfh.result', 'email_group_id', string="Quiz Results")

    country = fields.Char(string="Country", compute='_compute_country', store=True)

    @api.depends('email')
    def _compute_name(self):
        for rec in self:
            rec.name = f"Results for {rec.email}" if rec.email else "Unnamed Group"

    @api.depends('result_ids.country')
    def _compute_country(self):
        for rec in self:
            countries = list(set(rec.result_ids.mapped('country')))
            rec.country = ', '.join(countries) if countries else ''
