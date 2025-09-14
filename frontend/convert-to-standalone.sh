#!/bin/bash

# List of components to convert
components=(
  "src/app/page/purchase-detail/purchase-detail.component"
  "src/app/page/products/products.component"
  "src/app/page/purchases/purchases.component"
  "src/app/page/employee-report/employee-report.component"
  "src/app/page/employee-detail/employee-detail.component"
  "src/app/page/page-not-found/page-not-found.component"
  "src/app/page/admin/admin.component"
  "src/app/page/employees/employees.component"
  "src/app/page/purchase-report/purchase-report.component"
  "src/app/app.component"
)

# Convert each component to standalone
for component in "${components[@]}"; do
  echo "Converting $component to standalone..."
  
  # Add imports and standalone: true to component.ts
  ts_file="${component}.ts"
  if [[ -f "$ts_file" ]]; then
    # Add imports after @angular/core import
    sed -i.bak '/import.*@angular\/core/a\
import { CommonModule } from '\''@angular/common'\'';\
import { FormsModule } from '\''@angular/forms'\'';
' "$ts_file"
    
    # Add standalone and imports to @Component decorator
    sed -i.bak '/styles: \[.*\]/a\
  standalone: true,\
  imports: [CommonModule, FormsModule]
' "$ts_file"
  fi
  
  # Update spec file
  spec_file="${component}.spec.ts"
  if [[ -f "$spec_file" ]]; then
    # Add testing imports
    sed -i.bak '/import.*@angular\/core\/testing/a\
import { HttpClientTestingModule } from '\''@angular/common/http/testing'\'';\
import { RouterTestingModule } from '\''@angular/router/testing'\'';
' "$spec_file"
    
    # Replace declarations with imports
    component_name=$(basename "$component" | sed 's/\.component//' | sed 's/-\([a-z]\)/\U\1/g' | sed 's/^./\U&/')Component
    sed -i.bak "s/declarations: \[ $component_name \]/imports: [ $component_name, HttpClientTestingModule, RouterTestingModule ]/g" "$spec_file"
  fi
done

echo "Conversion complete!"