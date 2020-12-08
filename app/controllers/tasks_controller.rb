class TasksController < ApplicationController
  before_action :set_task, only: %i[edit update destroy show]

  # GET /tasks
  # GET /tasks.json
  def index
    @project = Project.find(params[:project_id]) if params[:project_id]
    @tasks = @project ? @project.tasks : Task
    @tasks = @tasks.order(id: :desc)
  end

  def show
    respond_to do |format|
      format.js
      format.html
    end
  end

  def new
    @task = Task.new
    @task.project_id = params[:project_id]
    respond_to do |format|
      format.js { render :edit }
      format.html
    end
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks
  # POST /tasks.json
  def create
    @task = Task.new(task_params)
    respond_to do |format|
      if @task.save
        format.html { redirect_to tasks_path(project_id: @task.project_id), notice: 'Task was successfully created.' }
        format.json { render :show, status: :created, location: @task }
      else
        format.html { render :new }
        format.json { render json: @task.errors, status: :unprocessable_entity }
        format.js { render :edit }
      end
    end
  end

  # PATCH/PUT /tasks/1
  # PATCH/PUT /tasks/1.json
  def update
    respond_to do |format|
      if @task.update(task_params)
        format.html { redirect_to tasks_path(project_id: @task.project_id), notice: 'Task was successfully updated.' }
        format.json { render :show, status: :ok, location: @task }

      else
        format.html { render :edit }
        format.json { render json: @task.errors, status: :unprocessable_entity }
        format.js { render :edit }
      end
    end
  end

  # DELETE /tasks/1
  # DELETE /tasks/1.json
  def destroy
    @task.destroy
    respond_to do |format|
      format.html { redirect_to tasks_path(project_id: params[:params_id]),
        notice: 'Task was successfully destroyed.' }
      format.json { head :no_content }
      format.js { render :show }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_task
    @task = Task.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def task_params
    params.require(:task).permit(:project_id, :name, :completed)
  end

end
