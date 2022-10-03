
{{/* Returns the cluster secret name */}}
{{- define "levee.secretName" -}}
{{ .Release.Name }}
{{- end }}