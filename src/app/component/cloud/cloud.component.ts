import { Component, OnInit } from '@angular/core';
import { CloudService } from '../../service/cloud.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartConfiguration, ChartData, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-cloud',
  imports: [CommonModule, FormsModule, NgChartsModule,
    ReactiveFormsModule],
  templateUrl: './cloud.component.html',
  styleUrl: './cloud.component.scss'
})
export class CloudComponent implements OnInit {
  public cloudHeader: any[] = []
  public grid_data: any[] = []
  public barChartData: ChartData<'bar'> = {
    labels: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    datasets: [
      {
        data: [50, 82, 68, 40, 90, 60, 32, 95, 75, 43, 65, 94],
        label: 'Security Rating',
        backgroundColor: 'rgba(64, 183, 183, 0.6)',
        borderColor: 'rgb(27, 79, 79)',
        borderWidth: 1
      }
    ]
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: { display: true, text: 'Security Rating (%)' },
        ticks: {
          stepSize: 20, // Interval between ticks: 0, 20, 40, ...
          callback: function (value) {
            return value + '%'; // Optional: adds % sign to tick labels
          }
        }
      },
      x: {
        title: { display: true, text: 'Month' }
      }
    }
  };
  public halfDoughnutChartData: ChartData<'doughnut'> = {
    labels: ['Security Rating', 'Remaining'],
    datasets: [
      {
        data: [60, 40],
        backgroundColor: ['#36A2EB', '#E5E5E5'], // 60% blue, 40% gray
        borderWidth: 0
      }
    ]
  };

  public halfDoughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%', // optional: makes it a ring (like progress)
    rotation: -90, // rotate to start from bottom
    circumference: 180, // show only half the circle
    plugins: {
      legend: {
        display: false // hide legend for a cleaner look
      },
      tooltip: {
        enabled: true
      }
    }
  };

  halfDoughnutChartType: 'doughnut' = 'doughnut';
  currentPage = 1;  // Tracks the current page
  pageSize = 10;

  public barChartType: 'bar' = 'bar';
  public barChartLegend = true;
  constructor(private cloudService: CloudService) { }
  ngOnInit() {
    this.getCloudData();


  }

  getCloudData() {
    debugger
    const cloudData = this.cloudService.getGridData().subscribe((response) => {
      if (response && response.grid_columns) {
        this.cloudHeader = response.grid_columns;
        this.grid_data = response.grid_data;
      }
    })
  }

  selectAllRows(event: any) {
    const isChecked = event.target.checked;
    this.grid_data.forEach(row => {
      row.selected = isChecked;  // Set 'selected' property of each row
    });
  }

  deleteRow(data: any) {

  }
  get totalPages(): number {
    return Math.ceil(this.grid_data.length / this.pageSize);
  }
  get totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // Get the data for the current page
  get pagedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.grid_data.slice(start, start + this.pageSize);
  }

  // Navigate to the previous page
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Navigate to the next page
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  // Navigate to a specific page
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
