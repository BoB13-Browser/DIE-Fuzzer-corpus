const extensions = [".desktop"];
extensions.forEach(extension => {
  const fileName = `test${extension}`;
  const fileContent = `

[Desktop Entry]

Name=MATE Calculator

GenericName=Calculator

Comment=Perform arithmetic, scientific or financial calculations

Exec=mate-calc

# Translators: Do NOT translate or transliterate this text (this is an icon file name)!

Icon=accessories-calculator

Terminal=false

Type=Application

StartupNotify=true

# Translators: Search terms to find this application. Do NOT translate or localize the semicolons! The list MUST also end with a semicolon!

Keywords=calculator;MATE;scientific;arithmetic;financial;calculations;

Categories=GTK;Utility;Calculator;

X-MATE-DocPath=mate-calc/mate-calc.xml

X-MATE-Bugzilla-Bugzilla=MATE

X-MATE-Bugzilla-Product=mate-calc

X-MATE-Bugzilla-Component=general

X-MATE-Bugzilla-OtherBinaries=mate-calculator

`;
  const blob = new Blob([fileContent], {
    type: 'text/plain'
  });
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = blobUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});