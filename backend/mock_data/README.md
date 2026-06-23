# Chargeback Lifecycle Tracker Mock Data Package

This package contains synthetic mock data for the Chargeback Lifecycle Tracker PoC.

Every record is labeled with `synthetic_record_label = "SYNTHETIC - Chargeback Lifecycle Tracker mock data"` and must not be treated as production, customer, merchant, or processor data.

## Files

- `chargeback_cases.csv`: Primary backend source for mock chargeback case records.
- `chargeback_cases.json`: JSON export of the same records for tooling and review.
- `timeline_events.csv`: Primary backend source for mock lifecycle timeline records.
- `timeline_events.json`: JSON export of the same timeline records for tooling and review.
- `data_dictionary.json`: Entity and field dictionary, allowed values, and edge-case coverage notes.

## Entities

- `ChargebackCase`: A synthetic payment dispute case used by the dashboard, filters, statistics, and sample export.
- `TimelineEvent`: A synthetic lifecycle event derived from each case status for the timeline view.

## Edge-Case Coverage

The rows include unusual and error-state scenarios such as high-value disputes, missing merchant evidence, duplicate charge investigations, zero merchant liability, full merchant liability, pending cases past expected resolution, and settled merchant-response cases.
