function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass = "text-[var(--color-primary)]",
}) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-[var(--color-text-secondary)]">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-bold tracking-tight">
            {value}
          </h3>

          <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
            {description}
          </p>

        </div>

        <div className="rounded-lg bg-[var(--color-surface-hover)] p-3">
          <Icon className={`h-5 w-5 ${iconClass}`} />
        </div>

      </div>

    </div>
  );
}

export default StatCard;